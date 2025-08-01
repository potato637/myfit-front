import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { checkAuthStatus } from "../apis/auth";

interface UserType {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 세션 기반 인증 - 쿠키로 세션 관리되므로 서버에 상태 확인 요청
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await checkAuthStatus();
        console.log("세션 확인 응답:", response);
        if (response.isSuccess) {
          setUser({
            id: response.result.service_id,
            username: response.result.name,
            email: response.result.email || "",
          });
          setIsLoggedIn(true);
          console.log("로그인 상태로 설정됨");
        } else {
          console.log("로그인되지 않은 상태");
        }
      } catch (error) {
        console.error("세션 확인 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // API 인터셉터에서 401 에러 시 자동 로그아웃 처리
    const handleAutoLogout = () => {
      setUser(null);
      setIsLoggedIn(false);
    };

    window.addEventListener("auth:logout", handleAutoLogout);
    initializeAuth();

    return () => {
      window.removeEventListener("auth:logout", handleAutoLogout);
    };
  }, []);

  const login = (userData: UserType) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
