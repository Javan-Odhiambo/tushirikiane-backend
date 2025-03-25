"use client";

import { Avatar } from "@mantine/core";
import React from "react";

interface AvatarsContainerProps {
  people: {
    fullName: string;
    imageUrl?: string;
  }[];
}

const AvatarsContainer: React.FC<AvatarsContainerProps> = ({ people }) => {
  return (
    <Avatar.Group>
      {people.slice(0, 5).map((p, index) => (
        <Avatar key={index} src={p.imageUrl}>
          {!p.imageUrl && p.fullName.charAt(0).toUpperCase()}
        </Avatar>
      ))}
      {people.length > 5 && <Avatar>+{people.length - 5}</Avatar>}
    </Avatar.Group>
  );
};

export default AvatarsContainer;
