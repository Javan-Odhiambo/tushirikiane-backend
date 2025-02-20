import {rem, Text, Title} from "@mantine/core";

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
    return (
        <div className="flex flex-col py-8">
            <Text size={rem(60)}>
                {`${number} %`}
            </Text>
            <Text lineClamp={3} size={rem(16)} mt={12} >{description}</Text>
        </div>
    )
}

const WhyTeamsLoveUs = () => {
    return (
        <section className="container text-center">
            <Title order={2} fw={500} size={rem(24)} mb={24}>Why teams love Tushirikiane</Title>
            <div className="grid grid-cols-4 gap-12">
                {statsData.map((item, index) => (
                    <StatCard {...item} key={index}/>
                ))}
            </div>
        </section>
    )
}

export default WhyTeamsLoveUs