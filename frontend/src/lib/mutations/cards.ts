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

export const useCreateCard = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_CreatCardInput
    ): Promise<I_CreateCardResponse> => {
      return await protectedApi
        .post(URLS.apiCards(workSpaceId, boardId, listId), { json: values })
        .json();
    },
    onSuccess: (newCard) => {
      queryClient.setQueryData<I_GetCardRespone[]>(
        [QUERY_KEYS.cards(workSpaceId, boardId, listId)],
        (oldCards = []) => [...oldCards, newCard]
      );
      toast.success("Card created successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating card", error);
      toast.error("Failed to create card. Please try again");
      onError?.();
    },
  });
};
