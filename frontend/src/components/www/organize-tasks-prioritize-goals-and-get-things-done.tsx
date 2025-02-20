import {rem, Text, Title} from "@mantine/core"
import Image from "next/image";
import React from "react";

const OrganizeTasksPrioritizeGoalsAndGetThingsDone = () => {
    return (
        <section className="container mt-40">
            <Title order={2} fw={550} size={rem(38)} mb={16} lh={1.2}>Organize tasks, prioritize <br/>goals and <span className="text-blue-600">get things done</span></Title>
            <Text c="dimmed">
                Streamline your workflow with powerful intuitive tools that ensure your team <br/>stays organized and focused
                on their tasks
            </Text>
            <div className="grid grid-cols-3 gap-40 mt-8">
                {cardData.map((item, index) => (
                    <Cards {...item} key={index}/>
                ))}
            </div>

        </section>
    )
}

const cardData: { imgSrc: string | null, description: string }[] = [
    {imgSrc: null, description: "Comprehensive Tools to optimize teamwork"},
    {imgSrc: null, description: "All you need to manage projects on one platform"},
    {imgSrc: null, description: "Intuitive and easy to use interface for everyone"}
]

const Cards: React.FC<{ imgSrc: string | null, description: string }> = ({imgSrc = null, description}) => {
    return (
        <div>
            <Image src={imgSrc ?? ""} alt={""} height={280} width={280}/>
            <Text mt={6}>{description}</Text>
        </div>
    )
}

export default OrganizeTasksPrioritizeGoalsAndGetThingsDone