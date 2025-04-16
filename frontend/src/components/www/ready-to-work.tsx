"use client";
import { URLS } from "@/lib/urls";
import { rem, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import BlackButton from "../core/Button";

const ReadytoWork = () => {
  const isMobile = useMediaQuery("(max-width: 720px)");

  // Custom version of BoldWord without underline for this specific case
  const BoldWordWithoutUnderline = ({ word }: { word: string }) => {
    const isMobile = useMediaQuery("(max-width: 720px)");
    return (
      <Text
        fw={550}
        size={rem(isMobile ? 22 : 38)}
        mb={isMobile ? 10 : 16}
        lh={1.2}
        c="skyBlue"
        className={"inline"}
      >
        {word}
      </Text>
    );
  };

  return (
    <div className="container md:mt-40 mt-20 mb-20 flex flex-col items-center justify-center">
      <Title
        order={2}
        fw={550}
        size={isMobile ? rem(24) : rem(38)}
        mb={16}
        lh={1.2}
        p={6}
        className="flex items-center"
      >
        Ready to work&nbsp;
        <span className="relative inline-block">
          {/* Circle SVG behind or around the word */}
          <Image
            src="/circle.svg"
            alt="circle"
            width={120}
            height={120}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ scale: 1.2 }}
          />
          <span className="relative">
            <BoldWordWithoutUnderline word="smarter" />
          </span>
        </span>
        &nbsp;?
      </Title>
      <Text className="text-center" maw={600} my={4}>
        It&apos;s time to say goodbye to expensive subscriptions and hello to
        seamless, affordable collaboration.
      </Text>
      <BlackButton href={URLS.signUp} text={"Get Started Now"} size="md" />
    </div>
  );
};

export default ReadytoWork;
