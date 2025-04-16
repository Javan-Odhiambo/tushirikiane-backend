import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { I_CreatCardInput, I_EditListInput } from "../interfaces/inputs";
import {
  I_GetCardRespone as I_CreateCardResponse,
  I_EditListResponse,
  I_GetCardRespone,
  I_GetListResponse,
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

export const useEditList = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_EditListInput
    ): Promise<I_EditListResponse> => {
      return await protectedApi
        .put(URLS.apiListsDetail(workSpaceId, boardId, listId), {
          json: values,
        })
        .json();
    },
    onSuccess: (editedList) => {
      queryClient.setQueryData<I_GetListResponse[]>(
        [QUERY_KEYS.lists(workSpaceId, boardId)],
        (oldLists = []) =>
          oldLists.map((list) =>
            list.id === editedList.id ? editedList : list
          )
      );

      toast.success("List updated successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error updating list", error);
      toast.error("Failed to update list. Please try again");
      onError?.();
    },
  });
};

export const useDeleteList = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await protectedApi.delete(
        URLS.apiListsDetail(workSpaceId, boardId, listId)
      );
    },
    onSuccess: () => {
      queryClient.setQueryData<I_GetCardRespone[]>(
        [QUERY_KEYS.lists(workSpaceId, boardId)],
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
