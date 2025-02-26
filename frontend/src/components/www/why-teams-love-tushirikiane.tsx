'use client'
import {rem, Text, Title} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";

const statsData: { number: number | string, description: string }[] = [
    {
        number: 75,
        description: "Users report increased team productivity"
    },
    {
        number: 75,
        description: "Users report increased team productivity"
    },
    {
        number: 75,
        description: "Users report increased team productivity"
    },
    {
        number: 75,
        description: "Users report increased team productivity"
    },
]

const StatCard: React.FC<{ number: number | string, description: string }> = ({number, description}) => {
    const isMobile = useMediaQuery("(max-width: 720px)")

    return (
        <div className="flex flex-col py-8">
            <Text size={rem(isMobile?40:60)} c={"skyBlue"} >
                {`${number} %`}
            </Text>
            <Text lineClamp={3} size={rem(isMobile?14:16)} mt={isMobile?6:12} >{description}</Text>
        </div>
    )
}

const WhyTeamsLoveUs = () => {
    const isMobile = useMediaQuery("(max-width: 720px)")

    return (
        <section className="container text-center mt-[150px]">
            <Title order={2} fw={550} size={rem(isMobile? 22:24)} mb={isMobile?12:24}>Why teams love Tushirikiane</Title>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                {statsData.map((item, index) => (
                    <StatCard {...item} key={index}/>
                ))}
            </div>
        </section>
    )
}

export default WhyTeamsLoveUs