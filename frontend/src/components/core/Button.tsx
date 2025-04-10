// components/BlackLinkButton.tsx
"use client";

import { Anchor, Button } from "@mantine/core";
import Link from "next/link";

interface BlackButtonProps {
  href: string;
  text: string;
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "sm" | "md" | "lg" | "xl";
  isMobile?: boolean;
}

const BlackButton = ({
  href,
  text,
  size = "xl",
  radius = "md",
  isMobile = false,
}: BlackButtonProps) => {
  return (
    <Anchor component={Link} href={href}>
      <Button
        size={isMobile ? "sm" : size}
        radius={radius}
        color="black"        
      >
        {text}
      </Button>
    </Anchor>
  );
};

export default BlackButton;
