"use client";

import { M_People } from "@/lib/mockData";
import { Avatar } from "@mantine/core";
import React from "react";

interface AvatarsContainerProps {
  workSpaceSlug: string;
}

const AvatarsContainer: React.FC<AvatarsContainerProps> = ({
  workSpaceSlug,
}) => {
  // TODO: __k add fetching of workspace members here

  return (
    <Avatar.Group>
      {M_People.slice(0, 5).map((p, index) => (
        <Avatar key={index} src={p.imageUrl}>
          {!p.imageUrl && p.fullName.charAt(0).toUpperCase()}
        </Avatar>
      ))}
      {M_People.length > 5 && <Avatar>+{M_People.length - 5}</Avatar>}
    </Avatar.Group>
  );
};

export default AvatarsContainer;
