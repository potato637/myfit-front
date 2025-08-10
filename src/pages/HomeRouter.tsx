import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function HomeRouter() {
  const { isLoggedIn } = useAuth();

  // Redirect based on authentication status
  return isLoggedIn ? (
    <Navigate to="/feed" replace />
  ) : (
    <Navigate to="/onboarding" replace />
  );
}

export default HomeRouter;
