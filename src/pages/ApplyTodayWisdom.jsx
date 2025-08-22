import { useState } from "react";
import AddWisdomModal from "../components/ui/dashboard/AddWisdomModal";
import DashboardHeader from "../components/ui/DashboardHeader";
import { useAuthData } from "../contexts/AuthContext";
import { useWisdomLogs } from "../contexts/WisdomLogsContext";
import { useWisdomsData } from "../contexts/WisdomsContext";
import { saveDailyWisdom } from "../utils/fireStoreDB";

export default function ApplyTodayWisdom() {
  const [openModal, setOpenModal] = useState(false);
  const { wisdomLogs, setWisdomLogs } = useWisdomLogs();
  const { wisdomsData } = useWisdomsData();
  const { authData } = useAuthData();

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Get today's wisdom logs
  const todayLogs = wisdomLogs?.dailyBasisWisdomLogs?.[today]?.wisdoms || [];

  // Create a map of wisdom IDs that have already been logged today
  const todayLoggedWisdoms = new Map();
  todayLogs.forEach((log) => {
    todayLoggedWisdoms.set(log.id, log.applied);
  });

  // Get all available wisdoms from WisdomsProvider
  const availableWisdoms = wisdomsData?.wisdoms || [];

  // 🟢 handle log directly from card
  async function handleWisdomLog(wisdom, applied) {
    // Check if wisdom was already logged today
    if (todayLoggedWisdoms.has(wisdom.id)) {
      return; // Already logged today
    }

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

  // Get wisdom statistics for display
  const wisdomStats = availableWisdoms.map((wisdom) => {
    const isLoggedToday = todayLoggedWisdoms.has(wisdom.id);
    const todayStatus = todayLoggedWisdoms.get(wisdom.id);

    return {
      ...wisdom,
      isLoggedToday,
      todayStatus,
      canLog: !isLoggedToday,
    };
  });

  return (
    <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-background/80 to-background/60">
      <DashboardHeader headerName="Apply Today's Wisdom" />

      <main className="p-6">
        {/* Add Wisdom Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Daily Wisdom Practice
            </h1>
            <p className="text-gray-600">
              Track your daily wisdom applications and build better habits
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add New Wisdom
          </button>
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary/20 p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Today's Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {todayLogs.filter((log) => log.applied).length}
              </div>
              <div className="text-sm text-green-700">Applied Today</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {todayLogs.filter((log) => !log.applied).length}
              </div>
              <div className="text-sm text-red-700">Missed Today</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {availableWisdoms.length}
              </div>
              <div className="text-sm text-blue-700">Total Wisdoms</div>
            </div>
          </div>
        </div>

        {/* Wisdom Cards */}
        {availableWisdoms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Wisdoms Available
            </h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first wisdom to practice
            </p>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Add Your First Wisdom
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wisdomStats.map((wisdom, index) => (
              <div
                key={wisdom.id}
                className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  wisdom.isLoggedToday
                    ? wisdom.todayStatus
                      ? "border-green-300 bg-green-50/50"
                      : "border-red-300 bg-red-50/50"
                    : "border-primary/30 hover:border-primary/50"
                }`}
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {wisdom.wisdomName}
                      </h3>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        #{index + 1}
                      </span>
                    </div>
                    {wisdom.isLoggedToday && (
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          wisdom.todayStatus
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {wisdom.todayStatus ? "✅ Applied" : "❌ Missed"}
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <span className="text-sm text-gray-600 font-medium">
                      Category:
                    </span>
                    <p className="text-sm text-gray-700 mt-1">
                      {wisdom.category}
                    </p>
                  </div>

                  {/* Description if available */}
                  {wisdom.description && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {wisdom.description}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {!wisdom.isLoggedToday ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleWisdomLog(wisdom, true)}
                        disabled={!wisdom.canLog}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Applied
                      </button>
                      <button
                        onClick={() => handleWisdomLog(wisdom, false)}
                        disabled={!wisdom.canLog}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                        Missed
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-sm text-gray-500">
                        {wisdom.todayStatus
                          ? "Great job! You applied this wisdom today."
                          : "You marked this as missed today. Tomorrow is a new opportunity!"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Wisdom Modal */}
      {openModal && <AddWisdomModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}
