'use client'
import {Title, Text, rem} from "@mantine/core"
import {BoldWord} from "@/components/www/hero";
import {useMediaQuery} from "@mantine/hooks";

const OneTimePaymentLifetimeProductivity = () => {
    const isMobile = useMediaQuery("(max-width: 720px)")
    return (
        <section className="container mt-40">
            <Title order={2} fw={550} size={rem(isMobile?22:38)} mb={isMobile?10:16} lh={1.2}>One time payment, <BoldWord word={"lifetime"}/>
                <br/> productivity </Title>
            <Text c="dimmed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales
                ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In
                scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.
            </Text>
        </section>
    )
}

export default OneTimePaymentLifetimeProductivity