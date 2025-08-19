import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LifetimeStats = ({ data }) => {
  const chartData = {
    labels: ["Total Wisdom", "Applied Wisdom", "Missed Wisdom", "Max Streak"],
    datasets: [
      {
        data: [data.total, data.applied, data.missed, data.max_streak],
        backgroundColor: ["#4ade80", "#60a5fa", "#f87171", "yellow"], // green, blue, red
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10 },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default LifetimeStats;
