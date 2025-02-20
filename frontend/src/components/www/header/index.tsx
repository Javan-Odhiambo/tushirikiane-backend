import Link from "next/link"
import {Button} from "@mantine/core";

const Header = () => {
    return (
        <header className=" border-b border-gray-200">
            <div className="container flex justify-between items-center">
                <div>
                    TUSHIRIKIANE LOGO
                </div>
                <nav className="flex gap-8 items-center justify-between py-4">
                    <Link href={""}>Home</Link>
                    <Link href={""}>Feature</Link>
                    <Link href={""}></Link>
                    <Button> Get Started </Button>
                </nav>
            </div>
        </header>
    )
}

export default Header