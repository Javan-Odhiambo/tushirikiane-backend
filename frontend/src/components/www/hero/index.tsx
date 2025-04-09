"use client";
import { URLS } from "@/lib/urls";
import { Anchor, Button, rem, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";

export const BoldWord = ({ word }: { word: string }) => {
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

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <section className="bg-[linear-gradient(to_right,#FFFFFF_0%,#E5E9FF_12%,#CBD4FF_31%,#BCCAFF_51%,#CBD4FF_62%,#E5E9FF_78%,#FFFFFF_100%)] h-screen">
      <Image
        src={"/Hero.svg"}
        alt={"Hero section grid"}
        objectFit={"cover"}
        layout={"fill"}
        className={"-z-2"}
      />
      <section className="container h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center">
        <h1 className="font-bold md:font-medium tracking-tight leading-[50px] mb-2 md:mb-4  text-4xl text-center md:text-8xl md:leading-[120px]">
          Affordable, Efficient and built just for you{" "}
        </h1>
        <Text
          my={rem(isMobile ? 36 : 28)}
          size={rem(isMobile ? 16 : 20)}
          lh={isMobile ? 1.2 : 1.5}
          className="max-w-[900px] text-center"
        >
          We help teams like yours stay organized, track projects, and get
          things done—without breaking the bank. No monthly fees, no
          lock-ins—just one-time access and full control over your workflow.
        </Text>
        <div>
          {/* TODO: convert this to a reusable component */}
          <Anchor component={Link} href={URLS.signUp}>
            <Button size={isMobile ? "sm" : "xl"} radius={"md"}>
              Get Started Now
            </Button>
          </Anchor>
        </div>
      </section>
    </section>
  );
};

export default Hero;
