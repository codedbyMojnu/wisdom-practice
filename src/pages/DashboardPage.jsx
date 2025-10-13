import { useEffect } from "react";
import AiSuggestions from "../components/ui/dashboard/AiSuggestions";
import CategoryPercentageChart from "../components/ui/dashboard/CategoryPercentangeChart";
import LifetimeStatsChart from "../components/ui/dashboard/LifetimeStatsChart";
import WelcomeCard from "../components/ui/dashboard/WelcomeCard";
import WisdomProgressChart from "../components/ui/dashboard/WisdomProgressChart";
import { useAuth } from "../hooks/useAuth";
import { useWisdoms } from "../hooks/useWisdoms";
import { getWisdomData } from "../services/fireStoreDB";

export default function DashboardPage() {
  const { authData } = useAuth();
  const { setWisdomsData } = useWisdoms();

  useEffect(() => {
    async function fetchWisdomData() {
      const data = await getWisdomData(authData?.user?.uid);
      if (data?.wisdoms?.length > 0) {
        setWisdomsData(data);
      }
    }
    fetchWisdomData();
  }, [authData?.user?.uid, setWisdomsData]);

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl">
      {/* Top Section: Welcome + Progress + AI */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Welcome + Progress */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <WelcomeCard />
          <WisdomProgressChart />
        </div>
        {/* AI Suggestions */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <AiSuggestions />
        </div>
      </div>

      {/* Bottom Section: Category + Lifetime Stats */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <CategoryPercentageChart />
        <LifetimeStatsChart />
      </div>
    </div>
  );
}
