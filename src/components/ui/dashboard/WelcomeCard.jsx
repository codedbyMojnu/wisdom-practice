import { useEffect } from "react";
import { useAuthData } from "../../../contexts/AuthContext";
import { useWisdomLogs } from "../../../contexts/WisdomLogsContext";
import { getWisdomLogsFromDB } from "../../../utils/fireStoreDB";

export default function WelcomeCard() {
  const { authData } = useAuthData();
  const { wisdomLogs, setWisdomLogs } = useWisdomLogs();

  useEffect(() => {
    async function getWisdomLogsData(uid) {
      if (!uid) return;
      const response = await getWisdomLogsFromDB(uid);
      setWisdomLogs(response);
    }
    getWisdomLogsData(authData?.user?.uid);
  }, [authData?.user?.uid, setWisdomLogs]); // ✅ added dependency array

  const today = new Date().toISOString().split("T")[0];
  const todayWisdoms = wisdomLogs?.dailyBasisWisdomLogs?.[today]?.wisdoms || [];
  const todayTotalWisdom = todayWisdoms.length;

  const appliedCount = todayWisdoms.filter((wisdom) => wisdom?.applied).length;

  const todayWisdomAppliedPercentage =
    todayTotalWisdom > 0
      ? Math.round((appliedCount * 100) / todayTotalWisdom)
      : 0;

  return (
    <div className="lg:col-span-3">
      <div className="border  bg-[#F9F9EB]  rounded-2xl shadow-sm p-6 transition hover:shadow-md">
        {/* Greeting */}
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-green-700 mb-2">
          <span className="text-gray-800">
            {" " + (authData?.user?.displayName || "বন্ধু")}
          </span>
        </h2>

        {/* Progress */}
        <p className="text-lg text-gray-700 mb-1">
          আজকের দায়িত্ব পূরণ করেছেন{" "}
          <span className="font-semibold text-green-700">
            {todayWisdomAppliedPercentage}%
          </span>
        </p>

        {/* Motivation */}
        <p className="text-base text-gray-500 leading-relaxed">
          মনে রাখবেন—বড় কোনো লক্ষ্য বা দীর্ঘ যাত্রা শুরু হয় একটি ছোট্ট পদক্ষেপ
          দিয়ে।
        </p>
      </div>
    </div>
  );
}
