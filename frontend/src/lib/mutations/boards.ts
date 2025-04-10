import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  I_AcceptBoardInviteInput,
  I_AcceptBoardInviteResponse,
  I_CreateBoardInput,
  I_CreateBoardResponse,
  I_GetBoardResponse,
  I_InviteToBoardInput,
  I_InviteToBoardResponse,
} from "../interfaces";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useCreateBoard = (
  workSpaceSlug: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_CreateBoardInput
    ): Promise<I_CreateBoardResponse> => {
      return await protectedApi
        .post(URLS.apiBoards(workSpaceSlug), { json: values })
        .json();
    },
    onSuccess: (newBoard) => {
      queryClient.setQueryData<I_CreateBoardResponse[]>(
        [QUERY_KEYS.boards(workSpaceSlug)],
        (oldBoards = []) => [...oldBoards, newBoard]
      );
      toast.success("Board created successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating board:", error);
      toast.error("Failed to create board. Please try again");
      onError?.();
    },
  });
};

export const useDeleteBoard = (
  workspaceSlug: string,
  boardSlug: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await protectedApi.delete(URLS.apiBoardsDetail(workspaceSlug, boardSlug));
    },
    onSuccess: () => {
      queryClient.setQueryData<I_GetBoardResponse[]>(
        [QUERY_KEYS.boards],
        (oldBoards = []) => oldBoards.filter((b) => b.id !== boardSlug)
      );

      toast.success("Board deleted successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error("Failed to delete board. Please try again.");
      onError?.();
    },
  });
};

export const useInviteToBoard = (
  workspaceId: string,
  boardId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: async (
      values: I_InviteToBoardInput
    ): Promise<I_InviteToBoardResponse> => {
      return await protectedApi
        .post(URLS.apiInviteToBoard(workspaceId, boardId), {
          json: values,
        })
        .json();
    },
    onSuccess: () => {
      toast.success("Board invites sent successfully.");
      onSuccess?.();
    },
    onError: (error: unknown) => {
      console.error("Error sending board invites", error);
      toast.error("Failed to invite emails to this board. Please try again.");
      onError?.();
    },
  });
};

export const useAcceptBoardInvite = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: async (
      values: I_AcceptBoardInviteInput
    ): Promise<I_AcceptBoardInviteResponse> => {
      return await protectedApi
        .post(URLS.apiAcceptBoardInvite, {
          json: values,
        })
        .json();
    },
    onSuccess: () => {
      toast.success("Board invite accepted successfully.");
      onSuccess?.();
    },
    onError: (error: unknown) => {
      console.error("Error accepting board invites", error);
      toast.error(
        "Failed to accept the invite to this board. Please try again."
      );
      onError?.();
    },
  });
};
