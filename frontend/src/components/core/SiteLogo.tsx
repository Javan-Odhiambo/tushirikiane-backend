import { Flex, Title, TitleOrder } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SiteLogoProps {
  titleOrder?: TitleOrder;
  logoDimensions?: number;
}

const SiteLogo: React.FC<SiteLogoProps> = ({
  titleOrder = 2,
  logoDimensions = 28,
}) => {
  return (
    <Flex gap={"sm"}>
      <Link href={"/"}>
        <Image
          src={"/core/logo.svg"}
          alt="Site logo"
          width={logoDimensions}
          height={logoDimensions}
        />
      </Link>
        <Title order={titleOrder}>Tushirikiane</Title>
    </Flex>
  );
};

export default SiteLogo;
