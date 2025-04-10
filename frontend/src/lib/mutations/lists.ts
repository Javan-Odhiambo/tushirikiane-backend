import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { I_CreatCardInput } from "../interfaces/inputs";
import {
  I_GetCardRespone as I_CreateCardResponse,
  I_GetCardRespone,
} from "../interfaces/responses";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useCreateList = (
  workSpaceId: string,
  boardId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_CreatCardInput
    ): Promise<I_CreateCardResponse> => {
      return await protectedApi
        .post(URLS.apiLists(workSpaceId, boardId), { json: values })
        .json();
    },
    onSuccess: (newList) => {
      queryClient.setQueryData<I_GetCardRespone[]>(
        [QUERY_KEYS.lists(workSpaceId, boardId)],
        (oldLists = []) => [...oldLists, newList]
      );
      toast.success("List created successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating list", error);
      toast.error("Failed to create list. Please try again");
      onError?.();
    },
  });
};

export const useDeleteList = (
  workspaceId: string,
  boardId: string,
  listId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await protectedApi.delete(
        URLS.apiListsDetail(workspaceId, boardId, listId)
      );
    },
    onSuccess: () => {
      queryClient.setQueryData<I_GetCardRespone[]>(
        [QUERY_KEYS.lists(workspaceId, boardId)],
        (oldLists = []) => oldLists.filter((l) => l.id !== listId)
      );

      toast.success("List deleted successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("List deletion failed:", error);
      toast.error("Failed to delete list. Please try again.");
      onError?.();
    },
  });
};
