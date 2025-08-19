import DashboardHeader from "../components/ui/DashboardHeader";
import { useWisdomLogs } from "../contexts/WisdomLogsContext";

export default function WisdomTemplatesPage() {
  const { wisdomLogs } = useWisdomLogs();

  console.log(wisdomLogs);

  // Flatten all wisdom logs
  const allWisdoms = Object.values(
    wisdomLogs?.dailyBasisWisdomLogs || {}
  ).flatMap((day) => day.wisdoms || []);

  // Count applied vs total for each wisdomName
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

  // Convert to array and calculate percentage
  const wisdomsArray = Object.values(wisdomStats).map((item) => ({
    ...item,
    percentage: ((item.appliedCount / item.total) * 100).toFixed(1),
  }));

  return (
    <>
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen bg-background/80">
        <DashboardHeader headerName="Your Wisdoms" />

        <main className="p-6">
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse table-auto">
              <thead className="bg-primary/10">
                <tr>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    #
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Wisdom Name
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Category
                  </th>
                  <th className="border border-primary/40 p-3 text-left text-sm font-semibold text-primary">
                    Applied Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {wisdomsArray.map(
                  ({ id, wisdomName, category, percentage }, index) => (
                    <tr
                      key={id + index}
                      className="even:bg-white odd:bg-primary/5 hover:bg-primary/20 transition-colors"
                    >
                      <td className="border border-primary/40 p-3 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="border border-primary/40 p-3 text-sm text-gray-800 font-medium">
                        {wisdomName}
                      </td>
                      <td className="border border-primary/40 p-3 text-sm text-gray-700">
                        {category}
                      </td>
                      <td className="border border-primary/40 p-3 text-sm text-gray-700">
                        {percentage}%
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
