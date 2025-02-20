import {Button, rem, Text, Title} from "@mantine/core"

const Hero = () => {
    return (
        <section className="container h-[calc(100vh-112px)] flex flex-col justify-center text-center">
            <Title order={1} lh={1} className="font-semibold" size={rem(92)}>Affordable, Efficient and built just for
                you </Title>
            <Text my={rem(32)} size={rem(25)} lh={1.2} c="dimmed">We help teams like yours stay organized, track
                projects,
                and get things done—without breaking the
                bank. No monthly fees, no lock-ins—just one-time access and full control over your workflow.</Text>
            <div>
                <Button className="w-fit" size="xl" radius={50}> Get Started </Button>
            </div>
        </section>
    )
}

export default Hero