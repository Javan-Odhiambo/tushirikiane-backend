import { useQuery } from "@tanstack/react-query";
import { I_BoardResponse, I_WorkspaceResponse } from "./interfaces";
import { protectedApi } from "./kyInstance";
import { QUERY_KEYS } from "./queryKeys";
import { URLS } from "./urls";

export const useGetWorkSpaces = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.workspaces],
    queryFn: async (): Promise<I_WorkspaceResponse[]> => {
      return await protectedApi.get(URLS.apiWorkSpaces).json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};

export const useGetBoards = (workSpaceSlug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.boards],
    queryFn: async (): Promise<I_BoardResponse[]> => {
      return await protectedApi.get(URLS.apiBoards(workSpaceSlug)).json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
