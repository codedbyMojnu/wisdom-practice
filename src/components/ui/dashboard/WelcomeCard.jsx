import { useEffect } from "react";
import Card from "../../ui/primitives/Card";
import { useAuth } from "../../../hooks/useAuth";
import { useWisdomLogs } from "../../../hooks/useWisdomLogs";
import { getWisdomLogsFromDB } from "../../../services/fireStoreDB";

export default function WelcomeCard() {
  const { authData } = useAuth();
  const { wisdomLogs, setWisdomLogs } = useWisdomLogs();

  useEffect(() => {
    async function getWisdomLogsData(uid) {
      if (!uid) return;
      const response = await getWisdomLogsFromDB(uid);
      setWisdomLogs(response);
    }
    getWisdomLogsData(authData?.user?.uid);
  }, [authData?.user?.uid, setWisdomLogs]);

  const today = new Date().toISOString().split("T")[0];
  const todayWisdoms = wisdomLogs?.dailyBasisWisdomLogs?.[today]?.wisdoms || [];
  const totalToday = todayWisdoms.length;
  const appliedCount = todayWisdoms.filter((wisdom) => wisdom?.applied).length;
  const appliedPercentage = totalToday
    ? Math.round((appliedCount * 100) / totalToday)
    : 0;

  return (
    <div className="lg:col-span-3">
      <Card className="relative overflow-hidden p-6 md:p-8">
        <div
          className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/15 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/70">
              Welcome Back
            </p>
            <h2 className="font-headline text-3xl font-bold text-foreground">
              {authData?.user?.displayName || "Friend"}
            </h2>
          </div>

          <div className="rounded-xl border border-primary/15 bg-primary/10 px-5 py-4 backdrop-blur">
            <p className="text-base text-muted-foreground">
              Today&apos;s wisdom applied:
              <span className="pl-2 font-semibold text-primary">
                {appliedPercentage}%
              </span>
            </p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            Remember — a journey of a thousand miles begins with a single step.
          </p>
        </div>
      </Card>
    </div>
  );
}
