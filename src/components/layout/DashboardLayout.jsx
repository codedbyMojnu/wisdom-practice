import { useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function handleSignOut() {
    const response = await handleFirebaseSignout();
    if (response) {
      setWisdomsData(null);
      clearProfileData();
      navigate("/login");
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="font-body bg-background text-foreground min-h-screen">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#F9F9EB] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-[#388E3C]">Wisdom Practice</h1>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
            onClick={closeSidebar}
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
                onClick={closeSidebar}
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
                onClick={closeSidebar}
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
                onClick={closeSidebar}
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

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          className="p-2 rounded-md bg-[#F9F9EB] shadow-lg hover:bg-gray-100"
          aria-label="Open sidebar"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6 text-[#388E3C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <Outlet />
    </div>
  );
}
