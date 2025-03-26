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

export interface I_WorkspaceResponse {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface I_BoardResponse {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  workspace_id: string;
  position: number;
}
