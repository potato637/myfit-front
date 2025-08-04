import { useMutation } from "@tanstack/react-query";
import { postLogout, patchResetPassword } from "../apis/settingAPI";
import { useNavigate } from "react-router-dom";

export const usePostLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      navigate("/onboarding");
    },
  });
};

export const usePatchResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: logout } = usePostLogout();

  return useMutation({
    mutationFn: patchResetPassword,
    onSuccess: () => {
      logout();
      navigate("/onboarding");
    },
  });
};
