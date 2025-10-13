import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoutes() {
  const { authData } = useAuth();

  return authData?.user ? <Outlet /> : <Navigate to="/login" replace />;
}
