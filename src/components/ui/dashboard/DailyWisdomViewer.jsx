import { useMemo, useState } from "react";
import { useWisdomLogs } from "../../../hooks/useWisdomLogs";

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
    <section className="glass-card space-y-6 p-6 md:p-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <h3 className="font-headline text-2xl font-semibold text-foreground">
            Daily Wisdom Viewer
          </h3>
          <p className="text-sm text-muted-foreground/90">
            Select any date to review how you practiced wisdom that day.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field w-full min-w-[180px] appearance-none px-4 sm:w-auto"
              max={new Date().toISOString().split("T")[0]}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setSelectedDate(new Date().toISOString().split("T")[0])
              }
              className="btn btn-primary min-w-[80px]"
            >
              Today
            </button>
            {availableDates.length > 0 && (
              <button
                onClick={() => setSelectedDate(availableDates[0])}
                className="btn btn-secondary min-w-[80px]"
              >
                Latest
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="surface-card flex flex-col items-center justify-center gap-1 p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {dateStats.total}
          </div>
          <p className="text-sm text-muted-foreground">Total Wisdoms</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {dateStats.applied}
          </div>
          <p className="text-sm text-primary">Applied</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-center">
          <div className="text-2xl font-bold text-destructive">
            {dateStats.missed}
          </div>
          <p className="text-sm text-destructive">Missed</p>
        </div>
        <div className="surface-card flex flex-col items-center justify-center gap-1 p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {dateStats.percentage}%
          </div>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>
        <div className="surface-card flex flex-col items-center justify-center gap-1 p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {currentStreak}
          </div>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </div>
      </div>

      {dateStats.total > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Progress
            </span>
            <span className="text-sm text-muted-foreground/80">
              {dateStats.applied} of {dateStats.total} completed
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all"
              style={{ width: `${dateStats.percentage}%` }}
            />
          </div>
        </div>
      )}

      {recentDates.length > 0 && (
        <div>
          <h5 className="mb-3 font-medium text-foreground">Recent Dates</h5>
          <div className="flex flex-wrap gap-2">
            {recentDates.map((date) => {
              const isSelected = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`btn px-3 py-1.5 text-sm ${
                    isSelected
                      ? "btn-primary"
                      : "btn-secondary border-border/70 bg-transparent hover:bg-muted/50"
                  }`}
                >
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h4 className="mb-3 font-semibold text-foreground">
          {formatDate(selectedDate)}
        </h4>
        {dateStats.total === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card/70 px-6 py-10 text-center text-muted-foreground">
            <p>No wisdom logs found for this date yet.</p>
            <p className="mt-2 text-sm">
              Log a wisdom practice to start building your streak.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDateLogs.map((wisdom, index) => (
              <div
                key={`${wisdom.id}-${index}`}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                  wisdom.applied
                    ? "border-primary/25 bg-primary/10"
                    : "border-destructive/25 bg-destructive/10"
                }`}
              >
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">
                    {wisdom.wisdomName}
                  </h5>
                  <span className="mt-1 inline-block rounded-full bg-card/70 px-2 py-1 text-xs font-medium text-muted-foreground">
                    {wisdom.category}
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    wisdom.applied ? "text-primary" : "text-destructive"
                  }`}
                >
                  {wisdom.applied ? "Applied" : "Missed"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {wisdomStats.length > 0 && (
        <div className="border-t border-border/70 pt-6">
          <h5 className="mb-4 font-medium text-foreground">
            Your Progress Per Wisdom
          </h5>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wisdomStats.map((wisdom) => {
              const isGood = wisdom.isGoodProgress;
              return (
                <div
                  key={wisdom.id}
                  className={`flex flex-col rounded-2xl border p-5 transition-all ${
                    isGood
                      ? "border-primary/20 bg-primary/10"
                      : "border-destructive/20 bg-destructive/10"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h6 className="font-semibold text-foreground">
                        {wisdom.wisdomName}
                      </h6>
                      <span className="mt-1 inline-block rounded-full bg-card/80 px-2 py-1 text-xs font-medium text-muted-foreground">
                        {wisdom.category}
                      </span>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        isGood ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {wisdom.statusText}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Applied: {wisdom.appliedCount}/{wisdom.total}
                      </span>
                      <span
                        className={isGood ? "text-primary" : "text-destructive"}
                      >
                        {wisdom.percentage}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isGood
                            ? "bg-gradient-to-r from-primary to-primary/70"
                            : "bg-gradient-to-r from-destructive to-destructive/70"
                        }`}
                        style={{
                          width: `${Math.min(wisdom.percentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="mt-auto text-center text-xs text-muted-foreground">
                    {isGood
                      ? `Excellent! You're maintaining ${wisdom.percentage}% success.`
                      : `Keep practicing and aim for 80%+ consistency (currently ${wisdom.percentage}%).`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
