import { useEffect } from "react";
import AiSuggestions from "../components/ui/dashboard/AiSuggestions";
import CategoryPercentageChart from "../components/ui/dashboard/CategoryPercentangeChart";
import LifetimeStatsChart from "../components/ui/dashboard/LifetimeStatsChart";
import WelcomeCard from "../components/ui/dashboard/WelcomeCard";
import WisdomLogger from "../components/ui/dashboard/WisdomLogger";
import WisdomProgressChart from "../components/ui/dashboard/WisdomProgressChart";
import DashboardHeader from "../components/ui/DashboardHeader";
import { useAuthData } from "../contexts/AuthContext";
import { useWisdomsData } from "../contexts/WisdomsContext";
import { getWisdomData } from "../utils/fireStoreDB";

export default function DashboardPage() {
  const { authData, setAuthData } = useAuthData();
  const { wisdomsData, setWisdomsData } = useWisdomsData();

  useEffect(() => {
    async function getWisdomDataFromfirStore(uid) {
      const data = await getWisdomData(uid);
      if (data?.wisdoms?.length > 0) {
        setWisdomsData(data);
      }
    }
    getWisdomDataFromfirStore(authData?.user?.uid);
  }, []);

  console.log(wisdomsData?.wisdoms);
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
            <WisdomProgressChart />

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
