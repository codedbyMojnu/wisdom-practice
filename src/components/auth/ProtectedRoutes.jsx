import { Navigate, Outlet } from "react-router";
import { useAuthData } from "../../contexts/AuthContext";

export default function ProtectedRoutes() {
  const { authData } = useAuthData();

  return authData?.user ? <Outlet /> : <Navigate to="/login" replace />;
}
