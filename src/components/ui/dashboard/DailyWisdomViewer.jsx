import { useMemo, useState } from "react";
import { useWisdomLogs } from "../../../contexts/WisdomLogsContext";

export default function DailyWisdomViewer() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { wisdomLogs } = useWisdomLogs();

  // Get available dates from wisdom logs
  const availableDates = useMemo(() => {
    if (!wisdomLogs?.dailyBasisWisdomLogs) return [];
    return Object.keys(wisdomLogs.dailyBasisWisdomLogs).sort(
      (a, b) => new Date(b) - new Date(a)
    );
  }, [wisdomLogs]);

  // Get recent dates for quick navigation
  const recentDates = useMemo(() => {
    return availableDates.slice(0, 7); // Last 7 days
  }, [availableDates]);

  // Get wisdom logs for selected date
  const selectedDateLogs = useMemo(() => {
    if (!wisdomLogs?.dailyBasisWisdomLogs?.[selectedDate]) return [];
    return wisdomLogs.dailyBasisWisdomLogs[selectedDate].wisdoms || [];
  }, [wisdomLogs, selectedDate]);

  // Calculate statistics for selected date
  const dateStats = useMemo(() => {
    const total = selectedDateLogs.length;
    const applied = selectedDateLogs.filter((wisdom) => wisdom.applied).length;
    const missed = total - applied;
    const percentage = total > 0 ? Math.round((applied / total) * 100) : 0;

    return { total, applied, missed, percentage };
  }, [selectedDateLogs]);

  // Calculate overall wisdom statistics with percentages
  const wisdomStats = useMemo(() => {
    // flatten logs
    const allWisdoms = Object.values(
      wisdomLogs?.dailyBasisWisdomLogs || {}
    ).flatMap((day) => day.wisdoms || []);

    // aggregate applied stats
    const stats = allWisdoms.reduce((acc, wisdom) => {
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

    // Calculate percentage and determine status
    return Object.values(stats).map((item) => {
      const percentage = parseFloat(
        ((item.appliedCount / item.total) * 100).toFixed(1)
      );
      const isGoodProgress = percentage >= 80;

      return {
        ...item,
        percentage,
        isGoodProgress,
        statusColor: isGoodProgress ? "green" : "red",
        statusText: isGoodProgress ? "On Track" : "Needs Attention",
      };
    });
  }, [wisdomLogs]);

  // Handle wisdom log update (commented out as not currently used)
  // async function handleWisdomLog(wisdom, applied) {
  //   const randomId = crypto.randomUUID();
  //   const uid = authData?.user?.uid;

  //   const wisdomLog = {
  //     id: wisdom?.id,
  //     wisdomName: wisdom?.wisdomName,
  //     category: wisdom?.category,
  //     applied,
  //   };

  //   await saveDailyWisdom(selectedDate, randomId, uid, wisdomLog);
  // }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get all available wisdoms for adding new ones (commented out as not currently used)
  // const allWisdoms = wisdomsData?.wisdoms || [];

  // Calculate streak for selected date
  const getStreak = (date) => {
    if (!wisdomLogs?.dailyBasisWisdomLogs) return 0;

    const dates = Object.keys(wisdomLogs.dailyBasisWisdomLogs).sort(
      (a, b) => new Date(b) - new Date(a)
    );
    const dateIndex = dates.indexOf(date);

    if (dateIndex === -1) return 0;

    let streak = 0;
    for (let i = dateIndex; i < dates.length; i++) {
      const currentDate = dates[i];
      const logs = wisdomLogs.dailyBasisWisdomLogs[currentDate]?.wisdoms || [];
      const hasApplied = logs.some((wisdom) => wisdom.applied);

      if (hasApplied) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = getStreak(selectedDate);

  return (
    <div className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h3 className="font-headline text-lg font-semibold mb-2">
              Daily Wisdom Viewer
            </h3>
            <p className="text-sm text-gray-500">
              Select any date to view your wisdom practice for that day
            </p>
          </div>

          {/* Date Selector */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              max={new Date().toISOString().split("T")[0]}
            />

            {/* Quick Date Navigation */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSelectedDate(new Date().toISOString().split("T")[0])
                }
                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm"
              >
                Today
              </button>
              {availableDates.length > 0 && (
                <button
                  onClick={() => setSelectedDate(availableDates[0])}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                >
                  Latest
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Date Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">
              {dateStats.total}
            </div>
            <div className="text-sm text-gray-600">Total Wisdoms</div>
          </div>
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">
              {dateStats.applied}
            </div>
            <div className="text-sm text-green-600">Applied</div>
          </div>
          <div className="bg-red-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-700">
              {dateStats.missed}
            </div>
            <div className="text-sm text-red-600">Missed</div>
          </div>
          <div className="bg-blue-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {dateStats.percentage}%
            </div>
            <div className="text-sm text-blue-600">Success Rate</div>
          </div>
          <div className="bg-yellow-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-700">
              {currentStreak}
            </div>
            <div className="text-sm text-yellow-600">Day Streak</div>
          </div>
        </div>

        {/* Progress Bar */}
        {dateStats.total > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-500">
                {dateStats.applied} of {dateStats.total} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${dateStats.percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Recent Dates Navigation */}
        {recentDates.length > 0 && (
          <div className="mb-6">
            <h5 className="font-medium text-gray-700 mb-3">Recent Dates</h5>
            <div className="flex flex-wrap gap-2">
              {recentDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedDate === date
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Date Display */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">
            {formatDate(selectedDate)}
          </h4>
          {dateStats.total === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No wisdom logs found for this date.</p>
              <p className="text-sm mt-2">
                Start practicing wisdom to see your progress!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateLogs.map((wisdom, index) => (
                <div
                  key={`${wisdom.id}-${index}`}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    wisdom.applied
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 mb-1">
                      {wisdom.wisdomName}
                    </h5>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        wisdom.applied
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {wisdom.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        wisdom.applied ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {wisdom.applied ? "Applied" : "Missed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Per Wisdom with Percentage Bars */}
        {wisdomStats.length > 0 && (
          <div className="border-t pt-6">
            <h5 className="font-medium text-gray-800 mb-4">
              Your Progress Per Wisdom
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wisdomStats.map((wisdom) => (
                <div
                  key={wisdom.id}
                  className={`border rounded-xl p-4 hover:shadow-lg transition-all duration-200 ${
                    wisdom.isGoodProgress
                      ? "border-green-300 bg-green-50/50"
                      : "border-red-300 bg-red-50/50"
                  }`}
                >
                  {/* Wisdom Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h6 className="font-semibold text-gray-800 mb-1">
                        {wisdom.wisdomName}
                      </h6>
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                        {wisdom.category}
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        wisdom.isGoodProgress
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {wisdom.statusText}
                    </div>
                  </div>

                  {/* Progress Statistics */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Applied: {wisdom.appliedCount}/{wisdom.total}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          wisdom.isGoodProgress
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {wisdom.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          wisdom.isGoodProgress
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}
                        style={{
                          width: `${Math.min(wisdom.percentage, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Progress Message */}
                  <div className="text-center">
                    <p
                      className={`text-xs ${
                        wisdom.isGoodProgress
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {wisdom.isGoodProgress
                        ? `Excellent! You're maintaining ${wisdom.percentage}% success rate`
                        : `Keep practicing! Aim for 80% or higher (currently ${wisdom.percentage}%)`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
