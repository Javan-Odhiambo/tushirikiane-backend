'use client'
import Link from "next/link"
import {Burger, Button, Collapse} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

const Header = () => {
    const [opened, {toggle}] = useDisclosure(false);
    return (
        <header className=" border-b border-black shadow-xl py-2">
            <div className="container flex justify-between items-center">
                <div>
                    TUSHIRIKIANE LOGO
                </div>
                <nav className="hidden md:flex gap-8 items-center justify-between py-4">
                    <Link href={""}>Home</Link>
                    <Link href={""}>Feature</Link>
                    <Link href={""}></Link>
                    <Button color={"black"} className={"rounded-2xl"}> Get Started </Button>
                </nav>
                <Burger opened={opened} onClick={toggle} className="md:hidden" size="sm"/>
                <Collapse in={opened} className="absolute top-10 right-36 shadow-md md:hidden">
                    <nav className="flex flex-col items-center absolute shadow max-w-48 p-8">
                        <Link href={""}>Home</Link>
                        <Link href={""}>Feature</Link>
                        <Link href={""}></Link>
                        <Button color={"black"} className="w-fit" radius={50}> Get Started </Button>
                    </nav>
                </Collapse>
            </div>
        </header>
    )
}

export default Header