export const QUERY_KEYS = {
  workspaces: "workSpaces",
  boards: (workSpaceSlug: string) => `${workSpaceSlug}-boards`,
};
