import { useQuery } from "@tanstack/react-query";
import { I_GetLabelResponse } from "../interfaces/responses";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useGetLabels = (workSpaceId: string, boardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.labels(workSpaceId, boardId)],
    queryFn: async (): Promise<I_GetLabelResponse[]> => {
      return await protectedApi
        .get(URLS.apiLabels(workSpaceId, boardId))
        .json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
