"use client";

import { CONSTANTS } from "@/lib/constants";
import { I_Member } from "@/lib/interfaces/responses";
import { Avatar, Skeleton } from "@mantine/core";
import React from "react";
import MemberAvatar from "./MemberAvatar";

export interface AvatarsContainerProps {
  members?: I_Member[];
  isLoading: boolean;
}

const AvatarsContainer: React.FC<AvatarsContainerProps> = ({
  members = [],
  isLoading,
}) => {
  return (
    <Avatar.Group>
      {isLoading ? (
        <AvatarsSkeletonContainer />
      ) : (
        members.slice(0, CONSTANTS.avatarMaxSize).map((m, index) => {
          return (
            <MemberAvatar
              key={index}
              fullName={`${m.first_name} ${m.last_name}`}
              initials={
                m.first_name.charAt(0).toUpperCase() +
                (m.last_name.charAt(0)?.toUpperCase() || "")
              }
            />
          );
        })
      )}

      {!isLoading && members.length > CONSTANTS.avatarMaxSize && (
        <Avatar>+{members.length - CONSTANTS.avatarMaxSize}</Avatar>
      )}
    </Avatar.Group>
  );
};

const AvatarsSkeletonContainer = () => {
  return (
    <>
      {Array.from({ length: CONSTANTS.avatarMaxSize }).map((_, index) => (
        <Skeleton
          key={index}
          width={36}
          height={36}
          radius="xl"
          visible={true}
        />
      ))}
    </>
  );
};

export default AvatarsContainer;
