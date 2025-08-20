import { NavLink, Outlet, useNavigate } from "react-router";
import DashboardIcon from "../../assets/icons/dashboardIcon";
import HorizontalLine from "../../assets/icons/horizontalLine";
import ProfileIcon from "../../assets/icons/profileIcon";
import SignoutIcon from "../../assets/icons/signOut";
import Templatesicon from "../../assets/icons/templatesIcon";
import { useProfile } from "../../contexts/ProfileContext";
import { useWisdomsData } from "../../contexts/WisdomsContext";
import { handleFirebaseSignout } from "../../utils/firebaseAuth";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { setWisdomsData } = useWisdomsData();
  const { clearProfileData } = useProfile();

  async function handleSignOut() {
    const response = await handleFirebaseSignout();
    if (response) {
      setWisdomsData(null);
      clearProfileData();
      navigate("/login");
    }
  }
  return (
    <div className="font-body bg-background text-foreground min-h-screen">
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-[#F9F9EB] shadow-lg transform lg:translate-x-0">
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-[#388E3C]">Wisdom Practice</h1>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <HorizontalLine />
          </button>
        </div>
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            <li>
              <NavLink
                end
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[#388E3C] bg-[#388E3C]/10 rounded-lg font-medium"
                    : "flex items-center px-4 py-3 text-gray-600 hover:text-[#388E3C] hover:bg-gray-50 rounded-lg transition-colors"
                }
              >
                <DashboardIcon />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[#388E3C] bg-[#388E3C]/10 rounded-lg font-medium"
                    : "flex items-center px-4 py-3 text-gray-600 hover:text-[#388E3C] hover:bg-gray-50 rounded-lg transition-colors"
                }
              >
                <ProfileIcon />
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/wisdom-list"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[#388E3C] bg-[#388E3C]/10 rounded-lg font-medium"
                    : "flex items-center px-4 py-3 text-gray-600 hover:text-[#388E3C] hover:bg-gray-50 rounded-lg transition-colors"
                }
              >
                <Templatesicon />
                Your Wisdom List
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            className="w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={handleSignOut}
          >
            <SignoutIcon />
            Sign Out
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
