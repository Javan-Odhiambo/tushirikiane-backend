export const URLS = {
  // FRONTEND
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",

  // workspaces
  workspaces: "/workspaces",
  calendar: "/workspaces/calendar",
  tasks: "/workspaces/tasks",
  team: "/workspaces/team",
  workspacesSlug: (slug: string) => `/workspaces/${slug}`,

  // boards
  boards: (workspacesSlug: string) => `/workspaces/${workspacesSlug}/boards`,
  boardsSlug: (workspacesSlug: string, slug: string) =>
    `/workspaces/${workspacesSlug}/boards/${slug}`,

  // BACKEND
  // auth
  // * DO NOT ADD 'auth/' PREFIX HERE, IT WILL BE DONE FOR YOU
  apiSignIn: "jwt/create",
  apiLoggedInUser: "users/me",
  apiSignUp: "users/",
  apiRefreshToken: "jwt/refresh",

  // workspaces
  apiWorkSpaces: "workspaces/",
  apiWorkSpacesDetail: (workspaceSlug: string) =>
    `workspaces/${workspaceSlug}/`,

  // boards
  apiBoards: (workSpaceSlug: string) => `workspaces/${workSpaceSlug}/boards/`,
  apiBoardsDetail: (workSpaceSlug: string, boardSlug: string) =>
    `workspaces/${workSpaceSlug}/boards/${boardSlug}/`,
};
