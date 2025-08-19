import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { useMemo } from "react";
import { useWisdomLogs } from "../../../contexts/WisdomLogsContext";
import CategoryPercentage from "./CategoryPercentange";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

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
        .filter((w) => w.category);

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
        return total > 0 ? ((applied / total) * 100).toFixed(2) : 0;
      });

      // **Danger categories: less than 80%**
      const dangerCategories = categories.filter(
        (cat, i) => percentages[i] < 80
      );

      const categoryData = {
        labels: categories,
        datasets: [
          {
            data: percentages,
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)",
              "rgba(245, 158, 11, 0.8)",
              "rgba(100, 116, 139, 0.8)",
              "rgba(34, 197, 94, 0.8)",
              "rgba(168, 85, 247, 0.8)",
            ],
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
    <div className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
        <p className="text-sm text-gray-500 mb-4">
          Your wisdom practice by category.
        </p>

        <div className="relative h-[250px] w-full rounded-md flex items-center justify-center text-gray-400">
          {categoryData ? (
            <CategoryPercentage categoryData={categoryData} />
          ) : (
            <span>No wisdom data</span>
          )}
        </div>

        {/* Danger List */}
        {dangerCategories.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold text-black mb-2">
              ⚠ Danger Categories (less than 80%)
            </h4>
            <ul className="list-disc list-inside text-gray-500">
              {dangerCategories.map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
