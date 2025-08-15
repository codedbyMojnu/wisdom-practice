import ResetPassword from "../components/auth/ResetPassword";
import DashboardHeader from "../components/ui/DashboardHeader";
import { useAuthData } from "../contexts/AuthContext";
import ProfileData from "../profile/ProfileData";

export default function ProfilePage() {
  const { authData, setAuthData } = useAuthData();
  return (
    <>
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen bg-background/80">
        <DashboardHeader headerName="Profile" />
        {/* Main Profile Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information Card */}

            <ProfileData />
            {/* Change Password Card */}
            {!authData?.user?.providerId === "google.com" && <ResetPassword />}
          </div>
        </main>
      </div>
    </>
  );
}
