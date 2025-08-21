import DashboardHeader from "../components/ui/DashboardHeader";
import { useAuthData } from "../contexts/AuthContext";
import { useWisdomLogs } from "../contexts/WisdomLogsContext";
import { useWisdomsData } from "../contexts/WisdomsContext";
import { saveDailyWisdom } from "../utils/fireStoreDB";

export default function WisdomTemplatesPage() {
  const { wisdomLogs, setWisdomLogs } = useWisdomLogs();
  const { authData } = useAuthData();
  const { wisdomsData } = useWisdomsData();

  // flatten logs
  const allWisdoms = Object.values(
    wisdomLogs?.dailyBasisWisdomLogs || {}
  ).flatMap((day) => day.wisdoms || []);

  // aggregate applied stats
  const wisdomStats = allWisdoms.reduce((acc, wisdom) => {
    const { wisdomName, applied, category, id } = wisdom;
    if (!acc[wisdomName]) {
      acc[wisdomName] = {
        id,
        wisdomName,
        category,
        total: 0,
        appliedCount: 0,
      };
    }
    acc[wisdomName].total += 1;
    if (applied) acc[wisdomName].appliedCount += 1;
    return acc;
  }, {});

  const wisdomsArray = Object.values(wisdomStats).map((item) => ({
    ...item,
    percentage: ((item.appliedCount / item.total) * 100).toFixed(1),
  }));

  // 🟢 handle log directly from card
  async function handleWisdomLog(wisdom, applied) {
    const today = new Date().toISOString().split("T")[0];
    const randomId = crypto.randomUUID();
    const uid = authData?.user?.uid;

    const wisdomLog = {
      id: wisdom?.id,
      wisdomName: wisdom?.wisdomName,
      category: wisdom?.category,
      applied,
    };

    const status = await saveDailyWisdom(today, randomId, uid, wisdomLog);

    setWisdomLogs((prev) => {
      switch (status) {
        case "firstLog":
          return {
            uid,
            dailyBasisWisdomLogs: {
              [today]: { id: randomId, wisdoms: [wisdomLog] },
            },
          };
        case "newDayLog":
          return {
            ...prev,
            dailyBasisWisdomLogs: {
              ...prev.dailyBasisWisdomLogs,
              [today]: { id: randomId, wisdoms: [wisdomLog] },
            },
          };
        case "todayDayExist":
          return {
            ...prev,
            dailyBasisWisdomLogs: {
              ...prev.dailyBasisWisdomLogs,
              [today]: {
                ...prev.dailyBasisWisdomLogs[today],
                wisdoms: [
                  ...prev.dailyBasisWisdomLogs[today].wisdoms,
                  wisdomLog,
                ],
              },
            },
          };
        default:
          return prev;
      }
    });
  }

  return (
    <div className="lg:ml-64 min-h-screen bg-background/80">
      <DashboardHeader headerName="Your Wisdoms" />

      <main className="p-6">
        {wisdomsArray.length === 0 ? (
          <p className="text-gray-500">No wisdom logs yet. Start logging!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wisdomsArray.map(
              ({ id, wisdomName, category, percentage }, index) => (
                <div
                  key={id + index}
                  className="bg-white rounded-2xl shadow p-5 border border-primary/30 hover:shadow-lg transition"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-primary">
                      {wisdomName}
                    </h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Category */}
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Category:</span> {category}
                  </p>

                  {/* Progress */}
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      Applied: {percentage}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        handleWisdomLog({ id, wisdomName, category }, true)
                      }
                      className="flex-1 bg-[#388E3C] text-white py-2 px-3 rounded-md hover:bg-[#388E3C]/90 transition-colors flex items-center justify-center"
                    >
                      ✅ Applied
                    </button>
                    <button
                      onClick={() =>
                        handleWisdomLog({ id, wisdomName, category }, false)
                      }
                      className="flex-1 bg-[#D32F2F] text-white py-2 px-3 rounded-md hover:bg-[#D32F2F]/90 transition-colors flex items-center justify-center"
                    >
                      ❌ Missed
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
