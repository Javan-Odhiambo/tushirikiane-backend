import {rem, Text, Title} from "@mantine/core"
import Image from "next/image";
import {BoldWord} from "@/components/www/hero";

const StayOnTopOfYourTasksEffortlessly = () => {
    return (
        <section className="container mt-40 flex justify-between items-center gap-12">
            <Image src={""} alt={""} height={450} width={450}/>
            <div className="flex-1">
                <Title order={2} fw={550} size={rem(38)} mb={16} lh={1.2}>Stay on top of your tasks <br/> <BoldWord
                    word={"effortlessly"}/> </Title>
                <Text c="dimmed">
                    Our task management system is designed to keep your projects organized and your team aligned with
                    powerful task tracking and management tools. We feature user friendly interfaces so you can easily
                    manage responsibilities and milestones and be in control.
                </Text>
            </div>
        </section>
    )
}

export default StayOnTopOfYourTasksEffortlessly