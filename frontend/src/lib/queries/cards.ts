import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";
import { I_GetCardRespone } from "../interfaces/responses";

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
