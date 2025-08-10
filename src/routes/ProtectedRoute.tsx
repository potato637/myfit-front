import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuth();

  // 로딩 중일 때는 로딩 화면 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/onboarding" replace />;
}

export default ProtectedRoute;
