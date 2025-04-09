import { useQuery } from "@tanstack/react-query";
import { I_GetBoardResponse } from "../interfaces";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useGetBoards = (workSpaceSlug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.boards(workSpaceSlug)],
    queryFn: async (): Promise<I_GetBoardResponse[]> => {
      return await protectedApi.get(URLS.apiBoards(workSpaceSlug)).json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
