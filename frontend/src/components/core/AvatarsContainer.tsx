"use client";

import { CONSTANTS } from "@/lib/constants";
import { I_GetWorkSpaceMemberResponse } from "@/lib/interfaces/responses";
import { Avatar, Skeleton, Tooltip } from "@mantine/core";
import React from "react";

export interface AvatarsContainerProps {
  workSpaceMembers?: I_GetWorkSpaceMemberResponse[];
  isLoading: boolean;
}

const AvatarsContainer: React.FC<AvatarsContainerProps> = ({
  workSpaceMembers = [],
  isLoading,
}) => {
  return (
    <Avatar.Group>
      {isLoading ? (
        <AvatarsSkeletonContainer />
      ) : (
        workSpaceMembers.slice(0, CONSTANTS.avatarMaxSize).map((p, index) => {
          const fullName = `${p.member.first_name} ${p.member.last_name}`;
          const initials =
            p.member.first_name.charAt(0).toUpperCase() +
            (p.member.last_name.charAt(0)?.toUpperCase() || "");

          return (
            <Tooltip
              key={p.id || index}
              label={fullName}
              withArrow
              openDelay={200}
            >
              <Avatar>{initials}</Avatar>
            </Tooltip>
          );
        })
      )}

      {!isLoading && workSpaceMembers.length > CONSTANTS.avatarMaxSize && (
        <Avatar>+{workSpaceMembers.length - CONSTANTS.avatarMaxSize}</Avatar>
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
