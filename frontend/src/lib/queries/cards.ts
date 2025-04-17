import { useQuery } from "@tanstack/react-query";
import {
  I_GetCardMemberResponse,
  I_GetCardRespone,
} from "../interfaces/responses";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useGetCards = (
  workSpaceId: string,
  boardId: string,
  listId: string
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.cards(workSpaceId, boardId, listId)],
    queryFn: async (): Promise<I_GetCardRespone[]> => {
      return await protectedApi
        .get(URLS.apiCards(workSpaceId, boardId, listId))
        .json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};

export const useGetCardMembers = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  cardId: string
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.cardMembers(workSpaceId, boardId, listId, cardId)],
    queryFn: async (): Promise<I_GetCardMemberResponse[]> => {
      return await protectedApi
        .get(URLS.apiCardsDetailMembers(workSpaceId, boardId, listId, cardId))
        .json();
    },
  });
};
