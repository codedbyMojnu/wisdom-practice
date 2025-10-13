import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { useMemo } from "react";
import { useWisdomLogs } from "../../../contexts/WisdomLogsContext";
import CategoryPercentage from "./CategoryPercentange";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const palette = ["#388E3C", "#D4AC0D", "#6D9773", "#3A5564", "#A3684A"];

export default function CategoryPercentageChart() {
  const { wisdomLogs } = useWisdomLogs();

  const { categories, categoryData, dangerCategories } = useMemo(() => {
    try {
      if (!wisdomLogs?.uid || !wisdomLogs?.dailyBasisWisdomLogs) {
        return { categories: [], categoryData: null, dangerCategories: [] };
      }

      const allWisdoms = Object.values(wisdomLogs.dailyBasisWisdomLogs)
        .flatMap((day) => day?.wisdoms || [])
        .map((w) => ({ ...w, category: w?.category }))
        .filter((w) => Boolean(w.category));

      if (allWisdoms.length === 0) {
        return { categories: [], categoryData: null, dangerCategories: [] };
      }

      const categoryStats = {};
      allWisdoms.forEach((w) => {
        const cat = w.category.trim();
        if (!categoryStats[cat]) categoryStats[cat] = { applied: 0, total: 0 };
        categoryStats[cat].total++;
        if (w.applied) categoryStats[cat].applied++;
      });

      const categories = Object.keys(categoryStats);
      const percentages = categories.map((cat) => {
        const { applied, total } = categoryStats[cat];
        return total > 0 ? Number(((applied / total) * 100).toFixed(2)) : 0;
      });

      const dangerCategories = categories.filter(
        (cat, index) => percentages[index] < 80
      );

      const categoryData = {
        labels: categories,
        datasets: [
          {
            data: percentages,
            backgroundColor: categories.map(
              (_, index) => palette[index % palette.length] + "CC"
            ),
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      };

      return { categories, categoryData, dangerCategories };
    } catch (error) {
      console.error("Error building categoryData:", error);
      return { categories: [], categoryData: null, dangerCategories: [] };
    }
  }, [wisdomLogs]);

  return (
    <section className="glass-card p-6">
      <header className="mb-4 space-y-1">
        <h3 className="font-headline text-xl font-semibold text-foreground">
          Category Breakdown
        </h3>
        <p className="text-sm text-muted-foreground">
          Review how consistently you apply wisdom across categories.
        </p>
      </header>

      <div className="relative flex h-[260px] w-full items-center justify-center rounded-xl border border-border/60 bg-card/70 p-4">
        {categoryData ? (
          <CategoryPercentage categoryData={categoryData} />
        ) : (
          <span className="text-sm text-muted-foreground">
            No wisdom data yet.
          </span>
        )}
      </div>

      {dangerCategories.length > 0 && (
        <div className="mt-5 rounded-lg border border-destructive/20 bg-destructive/10 p-4">
          <h4 className="font-semibold text-destructive">
            Focus Areas (under 80% consistency)
          </h4>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-destructive/90">
            {dangerCategories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
