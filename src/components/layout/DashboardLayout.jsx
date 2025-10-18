import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "../../assets/icons/dashboardIcon";
import ProfileIcon from "../../assets/icons/profileIcon";
import SignoutIcon from "../../assets/icons/signOut";
import Templatesicon from "../../assets/icons/templatesIcon";
import { useProfile } from "../../hooks/useProfile";
import { useWisdoms } from "../../hooks/useWisdoms";
import { handleFirebaseSignout } from "../../services/firebaseAuth";
import DashboardHeader from "../ui/DashboardHeader";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setWisdomsData } = useWisdoms();
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

  const headerName = (() => {
    const path = location.pathname || "";
    if (path.includes("/dashboard/profile")) return "Profile";
    if (path.includes("/dashboard/apply-today-wisdom")) return "Apply Wisdom";
    if (path.includes("/dashboard/daily-wisdom")) return "Daily Wisdom";
    return "Dashboard";
  })();

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/80 px-6">
          <h1 className="font-headline text-xl font-bold text-primary">
            Wisdom Practice
          </h1>
          <button
            className="rounded-md p-2 text-muted-foreground transition hover:bg-muted/60 lg:hidden"
            aria-label="Close sidebar"
            onClick={closeSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            <li>
              <NavLink
                end
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  }`
                }
                onClick={closeSidebar}
              >
                <DashboardIcon />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/apply-today-wisdom"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  }`
                }
                onClick={closeSidebar}
              >
                <Templatesicon />
                Apply Wisdom
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/daily-wisdom"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  }`
                }
                onClick={closeSidebar}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Your Wisdoms By Date</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  }`
                }
                onClick={closeSidebar}
              >
                <ProfileIcon />
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-border/70 bg-card px-4 py-4">
          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            onClick={handleSignOut}
          >
            <SignoutIcon />
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 lg:hidden">
        <button
          className="rounded-md bg-card p-2 text-primary shadow-lg transition hover:bg-primary/10"
          aria-label="Open sidebar"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6"
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
      <main className="lg:ml-64">
        <DashboardHeader headerName={headerName} />
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
