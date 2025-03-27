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
  created_at: string;
  updated_at: string;
  name: string;
}

export interface I_GetBoardResponse {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  workspace_id: string;
  position: number;
}

export interface I_CreateBoardInput {
  name: string;
  description: string;
  workspace_id: string;
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

export interface I_CreateWorkSpaceInput {
  name: string;
}

export interface I_CreateWorkSpaceResponse {
  name: string;
}

export interface I_InviteEmailsInput {
  emails: string[];
}

export interface I_InviteEmailsResponse {
  success: boolean;
}
