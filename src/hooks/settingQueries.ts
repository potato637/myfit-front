import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postLogout,
  patchResetPassword,
  patchBusinessProfile,
  PatchBusinessProfileProps,
} from "../apis/settingAPI";
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

export const usePatchBusinessProfile = ({
  service_id,
}: {
  service_id: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: PatchBusinessProfileProps) =>
      patchBusinessProfile(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", service_id] });
    },
    onError: (error) => {
      console.error("Failed to update profile status:", error);
    },
  });
};
