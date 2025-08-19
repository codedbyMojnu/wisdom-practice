import { useMemo } from "react";
import { useWisdomLogs } from "../../../contexts/WisdomLogsContext";
import LifetimeStats from "./LifetimeStats";

export default function LifetimeStatsChart() {
  const { wisdomLogs } = useWisdomLogs();

  const userData = useMemo(() => {
    if (!wisdomLogs?.dailyBasisWisdomLogs) return null;

    let appliedCount = 0;
    let missedCount = 0;

    for (const key in wisdomLogs.dailyBasisWisdomLogs) {
      wisdomLogs.dailyBasisWisdomLogs[key]?.wisdoms?.forEach((wisdom) => {
        if (wisdom?.applied === true) appliedCount++;
        if (wisdom?.applied === false) missedCount++;
      });
    }

    // ----- max_streak -----
    const logsByDate = wisdomLogs.dailyBasisWisdomLogs ?? {};
    const dateKeys = Object.keys(logsByDate);

    let maxStreak = 0;
    if (dateKeys.length > 0) {
      const toEpochDay = (iso) => {
        const [y, m, d] = iso.split("-").map(Number);
        return Date.UTC(y, m - 1, d) / 86_400_000;
      };

      const days = dateKeys
        .filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k))
        .map(toEpochDay)
        .sort((a, b) => a - b);

      let prev = null;
      let current = 0;

      for (const day of days) {
        if (prev === null) {
          current = 1;
        } else if (day === prev + 1) {
          current += 1;
        } else {
          current = 1;
        }
        maxStreak = Math.max(maxStreak, current);
        prev = day;
      }
    }

    return {
      total: appliedCount + missedCount,
      applied: appliedCount,
      missed: missedCount,
      max_streak: maxStreak,
    };
  }, [wisdomLogs]);

  if (!userData) return null;

  return (
    <div className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Lifetime Stats</h3>
        <p className="text-sm text-gray-500 mb-4">
          Your overall wisdom journey.
        </p>
        <div className="relative h-[250px] w-full  rounded-md flex items-center justify-center text-gray-400">
          <LifetimeStats data={userData} />
        </div>
      </div>
    </div>
  );
}
