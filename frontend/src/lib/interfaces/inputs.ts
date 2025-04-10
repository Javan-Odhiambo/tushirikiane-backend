export interface I_CreateBoardInput {
  name: string;
  description: string;
  workspace_id: string;
}

export interface I_CreatCardInput {
    name: string;
  }

  
export interface I_InviteEmailsInput {
  emails: string[];
}

export interface I_AcceptBoardInviteInput {
  token: string;
}

export interface I_AcceptWorkSpaceInviteInput {
  token: string;
}

export interface I_InviteToBoardInput {
  emails: string[];
}

export interface I_InviteToWorkSpaceInput {
  emails: string[];
}

export interface I_CreateWorkSpaceInput {
  name: string;
}
