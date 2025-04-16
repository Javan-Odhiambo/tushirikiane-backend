"use client";

import { Avatar, Tooltip } from "@mantine/core";
import React from "react";

interface MemberAvatarProps {
  fullName: string;
  initials: string;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ fullName, initials }) => {
  return (
    <Tooltip label={fullName} withArrow openDelay={200}>
      <Avatar>{initials}</Avatar>
    </Tooltip>
  );
};

export default MemberAvatar;
