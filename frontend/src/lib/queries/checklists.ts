import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";
import { I_GetChecklistResponse } from "../interfaces/responses";

export const useGetChecklists = (
  workSpaceId: string,
  boardId: string,
  listId: string,
  cardId: string
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.checklists(workSpaceId, boardId, listId, cardId)],
    queryFn: async (): Promise<I_GetChecklistResponse[]> => {
      return await protectedApi
        .get(URLS.apiChecklists(workSpaceId, boardId, listId, cardId))
        .json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
