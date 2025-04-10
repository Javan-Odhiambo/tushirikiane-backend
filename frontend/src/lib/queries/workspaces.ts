import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";
import { I_GetWorkspaceResponse } from "../interfaces/responses";

export const useGetWorkSpaces = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.workspaces],
    queryFn: async (): Promise<I_GetWorkspaceResponse[]> => {
      return await protectedApi.get(URLS.apiWorkSpaces).json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
