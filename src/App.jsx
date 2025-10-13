import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import AuthProvider from "./contexts/AuthContext";
import ProfileProvider from "./contexts/ProfileContext";
import WisdomLogsProvider from "./contexts/WisdomLogsContext";
import WisdomsProvider from "./contexts/WisdomsContext";
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));
const DashboardLayout = lazy(() =>
  import("./components/layout/DashboardLayout")
);
const ApplyTodayWisdom = lazy(() => import("./pages/ApplyTodayWisdom"));
const DailyWisdomPage = lazy(() => import("./pages/DailyWisdomPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <WisdomsProvider>
          <WisdomLogsProvider>
            <BrowserRouter>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
              />

              <Suspense
                fallback={
                  <div className="p-6 text-muted-foreground">Loading…</div>
                }
              >
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />

                  {/* Add more routes as needed */}
                  <Route element={<ProtectedRoutes />}>
                    <Route path="dashboard" element={<DashboardLayout />}>
                      <Route index element={<DashboardPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route
                        path="apply-today-wisdom"
                        element={<ApplyTodayWisdom />}
                      />
                      <Route
                        path="daily-wisdom"
                        element={<DailyWisdomPage />}
                      />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </WisdomLogsProvider>
        </WisdomsProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
