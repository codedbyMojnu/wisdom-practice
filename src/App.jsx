import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import DashboardLayout from "./components/layout/DashboardLayout";
import AuthProvider from "./contexts/AuthContext";
import WisdomLogsProvider from "./contexts/WisdomLogsContext";
import WisdomsProvider from "./contexts/WisdomsContext";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import WisdomTemplatesPage from "./pages/WisdomTemplatesPage";

export default function App() {
  return (
    <AuthProvider>
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

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Add more routes as needed */}
              <Route element={<ProtectedRoutes />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="wisdom-list" element={<WisdomTemplatesPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </WisdomLogsProvider>
      </WisdomsProvider>
    </AuthProvider>
  );
}
