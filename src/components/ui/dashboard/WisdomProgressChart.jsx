import { useEffect, useMemo, useState } from "react";
import { useWisdomLogs } from "../../../contexts/WisdomLogsContext";
import WisdomProgress from "./WisdomProgress";

export default function WisdomProgressChart() {
  const { wisdomLogs = {} } = useWisdomLogs() || {};
  const logs = wisdomLogs?.dailyBasisWisdomLogs || {};

  const [viewType, setViewType] = useState("yearly"); // "yearly" | "monthly"
  const [selectedYear, setSelectedYear] = useState(null);

  // --- unique years from data (sorted ascending) ---
  const allYears = useMemo(() => {
    const years = Array.from(
      new Set(Object.keys(logs).map((d) => d.slice(0, 4)))
    ).filter(Boolean);
    years.sort((a, b) => Number(a) - Number(b));
    return years;
  }, [logs]);

  // set default selectedYear once when available
  useEffect(() => {
    if (!selectedYear && allYears.length > 0) {
      setSelectedYear(allYears[allYears.length - 1]); // latest year by default
    }
  }, [allYears, selectedYear]);

  // --- aggregate stats (monthly and yearly) ---
  const { monthlyStats, yearlyStats } = useMemo(() => {
    const m = {}; // { "2023-01": { applied: n, missed: n }, ...}
    const y = {}; // { "2023": { applied: n, missed: n }, ...}

    Object.entries(logs).forEach(([date, log]) => {
      if (!date || !log?.wisdoms) return;
      const year = date.slice(0, 4);
      const month = date.slice(0, 7); // "YYYY-MM"

      log.wisdoms.forEach((w) => {
        const target = w.applied ? "applied" : "missed";

        if (!m[month]) m[month] = { applied: 0, missed: 0 };
        m[month][target]++;

        if (!y[year]) y[year] = { applied: 0, missed: 0 };
        y[year][target]++;
      });
    });

    return { monthlyStats: m, yearlyStats: y };
  }, [logs]);

  // --- prepare labels + data based on viewType ---
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let labels = [];
  let applied = [];
  let missed = [];

  if (viewType === "monthly") {
    // show all 12 months for selected year (fill 0 if missing)
    if (selectedYear) {
      labels = monthNames;
      const monthsForYear = Array.from(
        { length: 12 },
        (_, i) => `${selectedYear}-${String(i + 1).padStart(2, "0")}`
      ); // ["2024-01", "2024-02", ...]

      applied = monthsForYear.map((m) => monthlyStats[m]?.applied ?? 0);
      missed = monthsForYear.map((m) => monthlyStats[m]?.missed ?? 0);
    }
  } else {
    // yearly view: one bar per available year (sorted)
    const years = Object.keys(yearlyStats).sort(
      (a, b) => Number(a) - Number(b)
    );
    labels = years;
    applied = years.map((y) => yearlyStats[y]?.applied ?? 0);
    missed = years.map((y) => yearlyStats[y]?.missed ?? 0);
  }

  const noData =
    labels.length === 0 || (applied.length === 0 && missed.length === 0);

  return (
    <div className="glass-card p-6 lg:col-span-2">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-headline text-2xl font-semibold text-foreground">
            Wisdom Progress
          </h3>
          <p className="text-sm text-muted-foreground/90">
            Your applied and missed wisdom entries over time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="input-field"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
          </select>

          {viewType === "monthly" && (
            <select
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-field"
            >
              {allYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Chart area or "No data" */}
      <div className="relative flex h-[250px] w-full items-center justify-center rounded-md text-muted-foreground">
        {noData ? (
          <div className="text-center text-sm text-muted-foreground">
            No data to display.
          </div>
        ) : (
          <WisdomProgress labels={labels} applied={applied} missed={missed} />
        )}
      </div>
    </div>
  );
}
