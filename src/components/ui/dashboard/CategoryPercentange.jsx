import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function CategoryPercentage({ categoryData }) {
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label ?? "";
              const raw = Number(context.raw);
              const value = Number.isFinite(raw) ? raw.toFixed(2) : context.raw;
              return `Convert Rate: ${value}%`;
            },
          },
        },
      },
    }),
    []
  );

  const memoizedData = useMemo(() => categoryData, [categoryData]);

  return (
    <div className="chart-container h-64">
      <Doughnut data={memoizedData} options={options} />
    </div>
  );
}
