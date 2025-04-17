export const QUERY_KEYS = {
  workspaces: "workSpaces",
  workspaceMembers: (workSpaceId: string) => `${workSpaceId}-workSpaceMembers`,
  boards: (workSpaceSlug: string) => `${workSpaceSlug}-boards`,
  boardMembers: (workSpaceId: string, boardId: string) =>
    `${workSpaceId}-${boardId}-boardMembers`,
  labels: (workSpaceId: string, boardId: string) =>
    `${workSpaceId}-${boardId}-labels`,
  lists: (workSpaceId: string, boardId: string) =>
    `${workSpaceId}-${boardId}-lists`,
  cards: (workSpaceId: string, boardId: string, listId: string) =>
    `${workSpaceId}-${boardId}-${listId}-cards`,
  checklists: (
    workSpaceId: string,
    boardId: string,
    listId: string,
    cardId: string
  ) => `${workSpaceId}-${boardId}-${listId}-${cardId}-checklists`,
};
