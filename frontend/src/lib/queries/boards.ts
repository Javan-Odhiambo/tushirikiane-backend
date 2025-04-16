import { useQuery } from "@tanstack/react-query";
import {
  I_GetWorkSpaceMemberResponse as I_GetBoardMemberResponse,
  I_GetBoardResponse,
} from "../interfaces/responses";
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

export const useGetBoardMembers = (workSpaceId: string, boardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.boardMembers(workSpaceId, boardId)],
    queryFn: async (): Promise<I_GetBoardMemberResponse[]> => {
      return await protectedApi
        .get(URLS.apiBoardMembers(workSpaceId, boardId))
        .json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
