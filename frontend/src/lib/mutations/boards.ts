import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    I_CreateBoardInput,
    I_CreateBoardResponse,
    I_GetBoardResponse,
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
