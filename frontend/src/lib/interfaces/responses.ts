export interface I_LoginResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  access_token: string;
  message: string;
}

export interface I_GetWorkspaceResponse {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface I_GetBoardResponse {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  workspace_id: string;
  position: number;
}

export interface I_GetListResponse {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  board: string;
  position: number;
  description: string;
}

export interface I_GetCardRespone {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  due_date: string;
  task_list: string;
  position: number;
  is_completed: boolean;
  labels: string[];
}

export interface I_CreateBoardResponse {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  workspace_id: string;
  position: number;
}

export interface I_InviteToWorkSpaceResponse {
  message: string;
}

export interface I_InviteToBoardResponse {
  message: string;
}

export interface I_AcceptWorkSpaceInviteResponse {
  message: string;
}

export interface I_AcceptBoardInviteResponse {
  message: string;
}

export interface I_CreateWorkSpaceResponse {
  name: string;
}

export interface I_InviteEmailsResponse {
  success: boolean;
}
