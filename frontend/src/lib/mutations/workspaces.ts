import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  I_AcceptWorkSpaceInviteInput,
  I_AcceptWorkSpaceInviteResponse,
  I_CreateWorkSpaceInput,
  I_CreateWorkSpaceResponse,
  I_GetWorkspaceResponse,
  I_InviteToWorkSpaceInput,
  I_InviteToWorkSpaceResponse,
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
  workspaceId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: async (
      values: I_InviteToWorkSpaceInput
    ): Promise<I_InviteToWorkSpaceResponse> => {
      return await protectedApi
        .post(URLS.apiInviteToWorkSpace(workspaceId), {
          json: values,
        })
        .json();
    },
    onSuccess: () => {
      toast.success("Workspace invites sent successfully.");
      onSuccess?.();
    },
    onError: (error: unknown) => {
      console.error("Error sending workspace invites", error);
      toast.error(
        "Failed to invite emails to this workspace. Please try again."
      );
      onError?.();
    },
  });
};

export const useAcceptWorkSpaceInvite = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: async (
      values: I_AcceptWorkSpaceInviteInput
    ): Promise<I_AcceptWorkSpaceInviteResponse> => {
      return await protectedApi
        .post(URLS.apiAcceptWorkSpaceInvite, {
          json: values,
        })
        .json();
    },
    onSuccess: () => {
      toast.success("Workspace invite accepted successfully.");
      onSuccess?.();
    },
    onError: (error: unknown) => {
      console.error("Error accepting workspace invites", error);
      toast.error(
        "Failed to accept the invite to this workspace. Please try again."
      );
      onError?.();
    },
  });
};
