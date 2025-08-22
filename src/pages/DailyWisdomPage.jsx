import DashboardHeader from "../components/ui/DashboardHeader";
import DailyWisdomViewer from "../components/ui/dashboard/DailyWisdomViewer";

export default function DailyWisdomPage() {
  return (
    <div className="lg:ml-64 min-h-screen bg-background/80">
      <DashboardHeader headerName="Daily Wisdom Viewer" />
      <main className="p-6">
        <DailyWisdomViewer />
      </main>
    </div>
  );
}
