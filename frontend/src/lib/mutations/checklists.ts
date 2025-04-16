import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  I_AssignChecklistItemInput,
  I_CreateChecklistItemInput,
  I_EditChecklistInput,
} from "../interfaces/inputs";
import {
  I_AssignChecklistItemResponse,
  I_CreateChecklistItemResponse,
  I_EditCardResponse,
  I_GetCardRespone,
} from "../interfaces/responses";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useCreateChecklistItem = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  cardId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_CreateChecklistItemInput
    ): Promise<I_CreateChecklistItemResponse> => {
      return await protectedApi
        .post(URLS.apiChecklists(workSpaceId, boardId, listId, cardId), {
          json: values,
        })
        .json();
    },
    onSuccess: (createdChecklistItem) => {
      queryClient.setQueryData<I_CreateChecklistItemResponse[]>(
        [QUERY_KEYS.checklists(workSpaceId, boardId, listId, cardId)],
        (oldChecklists = []) => [...oldChecklists, createdChecklistItem]
      );
      toast.success("Task created successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating checklist item", error);
      toast.error("Failed to create task. Please try again");
      onError?.();
    },
  });
};

export const useEditChecklists = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  cardId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_EditChecklistInput
    ): Promise<I_EditCardResponse> => {
      return await protectedApi
        .put(URLS.apiCardsDetail(workSpaceId, boardId, listId, cardId), {
          json: values,
        })
        .json();
    },
    onSuccess: (editedChecklist) => {
      queryClient.setQueryData<I_GetCardRespone[]>(
        [QUERY_KEYS.cards(workSpaceId, boardId, listId)],
        (oldChecklists = []) =>
          oldChecklists.map((checklist) =>
            checklist.id === editedChecklist.id ? editedChecklist : checklist
          )
      );

      toast.success("Task updated successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error updating checklist item", error);
      toast.error("Failed to update task. Please try again");
      onError?.();
    },
  });
};

export const useDeleteChecklistItem = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  cardId: string,
  checklistId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await protectedApi.delete(
        URLS.apiChecklistsDetail(
          workSpaceId,
          boardId,
          listId,
          cardId,
          checklistId
        )
      );
    },
    onSuccess: () => {
      // TODO: update this to not invalidate the entire cache
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.checklists(workSpaceId, boardId, listId, cardId)],
      });

      toast.success("Task deleted successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error deleting task", error);
      toast.error("Failed to delete task. Please try again");
      onError?.();
    },
  });
};

export const useAssignChecklistItem = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  cardId: string,
  checklistId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_AssignChecklistItemInput
    ): Promise<I_AssignChecklistItemResponse> => {
      return await protectedApi
        .post(
          URLS.apiChecklistsDetailAssign(
            workSpaceId,
            boardId,
            listId,
            cardId,
            checklistId
          ),
          { json: values }
        )
        .json();
    },
    onSuccess: () => {
      // TODO: update this to not invalidate the entire cache
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.checklists(workSpaceId, boardId, listId, cardId)],
      });

      toast.success("Task assigned successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error assigning task", error);
      toast.error("Failed to assign task. Please try again");
      onError?.();
    },
  });
};
