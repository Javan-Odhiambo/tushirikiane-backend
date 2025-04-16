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
  // * DO NOT ADD 'auth/' PREFIX, IT WILL BE DONE FOR YOU
  apiSignIn: "jwt/create",
  apiLoggedInUser: "users/me",
  apiSignUp: "users/",
  apiRefreshToken: "jwt/refresh",
  apiActivateAccount: "users/activation/",
  apiResendActivationEmail: "users/resend_activation/",

  // workspaces
  apiWorkSpaces: "workspaces/",
  apiWorkSpacesDetail: (workspaceSlug: string) =>
    `workspaces/${workspaceSlug}/`,
  apiWorkSpacesMembers: (workspaceId: string) =>
    `workspaces/${workspaceId}/members/`,
  apiInviteToWorkSpace: (workSpaceId: string) =>
    `workspaces/${workSpaceId}/invite/`,
  apiAcceptWorkSpaceInvite: "workspaces/accept/",

  // boards
  apiBoards: (workSpaceSlug: string) => `workspaces/${workSpaceSlug}/boards/`,
  apiBoardsDetail: (workSpaceSlug: string, boardSlug: string) =>
    `workspaces/${workSpaceSlug}/boards/${boardSlug}/`,
  apiInviteToBoard: (workSpaceId: string, boardId: string) =>
    `workspaces/${workSpaceId}/boards/${boardId}/invite/`,
  apiAcceptBoardInvite: "boards/accept/",

  // lists
  apiLists: (workSpaceId: string, boardId: string) =>
    `workspaces/${workSpaceId}/boards/${boardId}/task-lists/`,
  apiListsDetail: (workSpaceId: string, boardId: string, listId: string) =>
    `workspaces/${workSpaceId}/boards/${boardId}/task-lists/${listId}}/`,

  // cards
  apiCards: (workSpaceId: string, boardId: string, listId: string) =>
    `workspaces/${workSpaceId}/boards/${boardId}/task-lists/${listId}/tasks/`,
  apiCardsDetail: (
    workSpaceId: string,
    boardId: string,
    listId: string,
    cardId: string
  ) =>
    `workspaces/${workSpaceId}/boards/${boardId}/task-lists/${listId}}/tasks/${cardId}/`,

  // checklists
  apiChecklists: (
    workSpaceId: string,
    boardId: string,
    listId: string,
    cardId: string
  ) =>
    `workspaces/${workSpaceId}/boards/${boardId}/task-lists/${listId}/tasks/${cardId}/checklist/`,
  apiChecklistsDetail: (
    workSpaceId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string
  ) =>
    `workspaces/${workSpaceId}/boards/${boardId}/task-lists/${listId}}/tasks/${cardId}/checklist/${checklistId}/`,
  apiChecklistsDetailAssign: (
    workSpaceId: string,
    boardId: string,
    listId: string,
    cardId: string,
    checklistId: string
  ) =>
    `workspaces/${workSpaceId}/boards/${boardId}/task-lists/${listId}}/tasks/${cardId}/checklist/${checklistId}/assign/`,
};
