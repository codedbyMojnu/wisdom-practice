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

const WisdomProgress = ({ labels = [], applied = [], missed = [] }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Applied",
        data: applied,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Missed",
        data: missed,
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        // let chart decide stepSize automatically unless you want fixed steps
      },
    },
    plugins: {
      legend: { position: "top" },
      title: {
        display: false,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default WisdomProgress;
