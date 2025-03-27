"use client";
import Link from "next/link";
import { Burger, Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SiteLogo from "@/components/core/SiteLogo";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`shadow-lg py-2 fixed top-0 left-0 w-full bg-white transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container flex justify-between items-center">
        <SiteLogo />
        <nav className="hidden md:flex gap-8 items-center justify-between py-4">
          <Link href={""}>Home</Link>
          <Link href={""}>Features</Link>
          <Link href={""}></Link>
          <Button color={"black"} className={"rounded-2xl"}>
            {" "}Get Started{" "}
          </Button>
        </nav>
        <Burger opened={opened} onClick={toggle} className="md:hidden" size="sm" />
        <Collapse in={opened} className="absolute top-10 right-36 shadow-md md:hidden">
          <nav className="flex flex-col items-center absolute shadow max-w-48 p-8">
            <Link href={""}>Home</Link>
            <Link href={""}>Feature</Link>
            <Link href={""}></Link>
            <Button color={"black"} className="w-fit" radius={50}>
              {" "}Get Started{" "}
            </Button>
          </nav>
        </Collapse>
      </div>
    </header>
  );
};

export default Header;
