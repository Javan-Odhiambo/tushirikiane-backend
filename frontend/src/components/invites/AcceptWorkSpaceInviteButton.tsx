"use client";

import { useAcceptWorkSpaceInvite } from "@/lib/mutations/workspaces";
import { URLS } from "@/lib/urls";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const AcceptWorkSpaceInviteButton = () => {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();

  const { mutate: acceptWorkSpaceInvite, isPending } = useAcceptWorkSpaceInvite(() => {
    router.push(URLS.workspaces);
  });

  const handleOnAcceptInviteClick = () => {
    acceptWorkSpaceInvite({ token: token });
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

export default AcceptWorkSpaceInviteButton;
