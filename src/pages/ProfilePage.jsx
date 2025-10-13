import ResetPassword from "../components/auth/ResetPassword";
import ProfileData from "../components/profile/ProfileData";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { authData } = useAuth();
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid gap-6 md:grid-cols-2">
        <ProfileData />
        {authData?.user?.providerId !== "google.com" && <ResetPassword />}
      </div>
    </div>
  );
}
