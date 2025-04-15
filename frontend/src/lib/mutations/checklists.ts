import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { I_EditChecklistInput } from "../interfaces/inputs";
import { I_EditCardResponse, I_GetCardRespone } from "../interfaces/responses";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

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
    onSuccess: (editedCard) => {
      queryClient.setQueryData<I_GetCardRespone[]>(
        [QUERY_KEYS.cards(workSpaceId, boardId, listId)],
        (oldCards = []) =>
          oldCards.map((card) =>
            card.id === editedCard.id ? editedCard : card
          )
      );

      toast.success("Card updated successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error updating card", error);
      toast.error("Failed to update card. Please try again");
      onError?.();
    },
  });
};
