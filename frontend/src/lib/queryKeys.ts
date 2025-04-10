export const QUERY_KEYS = {
  workspaces: "workSpaces",
  workspaceMembers: (workSpaceId: string) => `${workSpaceId}-workSpaceMembers`,
  boards: (workSpaceSlug: string) => `${workSpaceSlug}-boards`,
  lists: (workSpaceId: string, boardId: string) =>
    `${workSpaceId}-${boardId}-lists`,
  cards: (workSpaceId: string, boardId: string, listId: string) =>
    `${workSpaceId}-${boardId}-${listId}-cards`,
};
