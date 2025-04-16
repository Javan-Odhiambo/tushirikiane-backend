'use client'
import { BoldWord } from "@/components/www/hero";
import { Text, Title, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const OneTimePaymentLifetimeProductivity = () => {
    const isMobile = useMediaQuery("(max-width: 720px)")
    return (
        <section className="container mt-40">
            <Title order={2} fw={550} size={rem(isMobile?22:38)} mb={isMobile?10:16} lh={1.2}>One time payment, <BoldWord word={"lifetime"}/>
                <br/> productivity </Title>
            <Text c="dimmed">
                Invest once and unlock a lifetime of enhanced productivity. Our comprehensive suite of tools and features is designed to streamline your workflow, boost efficiency, and help you achieve more in less time. With a single payment, you gain unlimited access to all current and future updates, ensuring your productivity tools always stay ahead of the curve. No subscriptions, no hidden fees - just pure value that grows with you over time.
            </Text>
        </section>
    )
}

export default OneTimePaymentLifetimeProductivity