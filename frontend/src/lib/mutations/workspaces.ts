import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  I_CreateWorkSpaceInput,
  I_CreateWorkSpaceResponse,
  I_GetWorkspaceResponse,
} from "../interfaces";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useCreateWorkSpace = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_CreateWorkSpaceInput
    ): Promise<I_CreateWorkSpaceResponse> => {
      return await protectedApi
        .post(URLS.apiWorkSpaces, { json: values })
        .json();
    },
    onSuccess: (newWorkSpace) => {
      queryClient.setQueryData<I_CreateWorkSpaceResponse[]>(
        [QUERY_KEYS.workspaces],
        (oldWorkSpaces = []) => [newWorkSpace, ...oldWorkSpaces]
      );
      toast.success("Workspace created successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating workspace", error);
      toast.error("Failed to create workspace. Please try again");
      onError?.();
    },
  });
};

export const useDeleteWorkSpace = (
  workspaceSlug: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await protectedApi.delete(URLS.apiWorkSpacesDetail(workspaceSlug));
    },
    onSuccess: () => {
      queryClient.setQueryData<I_GetWorkspaceResponse[]>(
        [QUERY_KEYS.workspaces],
        (oldWorkSpaces = []) =>
          oldWorkSpaces.filter((ws) => ws.slug !== workspaceSlug)
      );

      toast.success("Workspace deleted successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error("Failed to delete workspace. Please try again.");
      onError?.();
    },
  });
};

export const useInviteToWorkSpace = (
  workspaceSlug: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({});
};
