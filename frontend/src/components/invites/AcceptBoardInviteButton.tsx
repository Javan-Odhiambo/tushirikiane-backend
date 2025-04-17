"use client";

import { useAcceptBoardInvite } from "@/lib/mutations/boards";
import { URLS } from "@/lib/urls";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const AcceptBoardInviteButton = () => {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();

  const { mutate: acceptBoardInvite, isPending } = useAcceptBoardInvite(() => {
    router.push(URLS.workspaces);
  });

  const handleOnAcceptInviteClick = () => {
    acceptBoardInvite({ token: token });
  };

  return (
    <Group>
      <Button
        component={Link}
        href={URLS.workspaces}
        variant="outline"
        disabled={isPending}
      >
        Go To My Workspaces
      </Button>
      <Button onClick={handleOnAcceptInviteClick} loading={isPending}>
        Accept Invite
      </Button>
    </Group>
  );
};

export default AcceptBoardInviteButton;
