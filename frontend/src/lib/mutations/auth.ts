import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  I_ActivateAccountInput,
  I_ResendActivationEmailInput,
} from "../interfaces/inputs";
import { authApi } from "../kyInstance";
import { URLS } from "../urls";

export const useActivateAccount = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: I_ActivateAccountInput) => {
      return await authApi.post(URLS.apiActivateAccount, { json: values });
    },
    onSuccess: () => {
      router.push(URLS.signIn);
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to activate your account. Please try again.");
      onError?.();
    },
  });
};

export const useResendActivationEmail = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: async (values: I_ResendActivationEmailInput) => {
      return await authApi.post(URLS.apiResendActivationEmail, {
        json: values,
      });
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to send email. Please try again.");
      onError?.();
    },
  });
};
