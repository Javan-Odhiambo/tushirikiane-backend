import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  I_CreateBoardInput,
  I_CreateBoardResponse,
  I_CreateWorkSpaceInput,
  I_CreateWorkSpaceResponse,
} from "./interfaces";
import { protectedApi } from "./kyInstance";
import { QUERY_KEYS } from "./queryKeys";
import { URLS } from "./urls";

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
        (oldWorkSpaces = []) => [...oldWorkSpaces, newWorkSpace]
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
