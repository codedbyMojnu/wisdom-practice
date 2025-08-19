import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function CategoryPercentage({ categoryData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: function (context) {
            // label text (category name)
            const label = context.label ?? "";
            // value may be string or number; coerce to number safely
            const raw = Number(context.raw);
            // if it's a number, format to 2 decimals; otherwise just show raw
            const value = Number.isFinite(raw) ? raw.toFixed(2) : context.raw;
            return `Convert Rate: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container h-64">
      <Doughnut data={categoryData} options={options} />
    </div>
  );
}
