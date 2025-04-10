import { useQuery } from "@tanstack/react-query";
import {
  I_GetWorkSpaceMemberResponse,
  I_GetWorkspaceResponse,
} from "../interfaces/responses";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

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

export const useGetWorkSpaceMembers = (workSpaceId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.workspaceMembers(workSpaceId)],
    queryFn: async (): Promise<I_GetWorkSpaceMemberResponse[]> => {
      return await protectedApi
        .get(URLS.apiWorkSpacesMembers(workSpaceId))
        .json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
