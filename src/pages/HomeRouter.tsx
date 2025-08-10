import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function HomeRouter() {
  const { isLoggedIn } = useAuth();
  console.log("Home Router: ", isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/feed" replace />;
  }

  return <Navigate to="/onboarding" replace />;
}

export default HomeRouter;
