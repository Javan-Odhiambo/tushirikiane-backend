import { Flex, Title, TitleOrder } from "@mantine/core";
import Image from "next/image";
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
      <Image
        src={"/core/logo.svg"}
        alt="Site logo"
        width={logoDimensions}
        height={logoDimensions}
      />
      <Title order={titleOrder}>Tushirikiane</Title>
    </Flex>
  );
};

export default SiteLogo;
