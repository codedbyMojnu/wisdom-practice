import AiSuggestions from "../components/ui/dashboard/AiSuggestions";
import CategoryPercentageChart from "../components/ui/dashboard/CategoryPercentangeChart";
import LifetimeStatsChart from "../components/ui/dashboard/LifetimeStatsChart";
import WelcomeCard from "../components/ui/dashboard/WelcomeCard";
import WisdomCountChart from "../components/ui/dashboard/WisdomCountChart";
import WisdomLogger from "../components/ui/dashboard/WisdomLogger";
import DashboardHeader from "../components/ui/DashboardHeader";

export default function DashboardPage() {
  return (
    <>
      {/* --- Main Content --- */}
      <div className="lg:ml-64 min-h-screen bg-[#F5F5DC]/80">
        <DashboardHeader headerName="Dashboard" />
        <main className="p-4 md:p-6 lg:p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Welcome Card */}
            <WelcomeCard />

            {/* Wisdom Chart */}
            <WisdomCountChart />

            <div className="flex flex-col gap-6">
              {/* Daily Logger and AI Suggestions */}
              <WisdomLogger />
              <AiSuggestions />
            </div>

            {/* Category Breakdown and Lifetime Stats */}
            <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
              <CategoryPercentageChart />
              <LifetimeStatsChart />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
