import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";
import { I_GetListResponse } from "../interfaces/responses";

export const useGetLists = (workSpaceId: string, boardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.lists(workSpaceId, boardId)],
    queryFn: async (): Promise<I_GetListResponse[]> => {
      return await protectedApi.get(URLS.apiLists(workSpaceId, boardId)).json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
