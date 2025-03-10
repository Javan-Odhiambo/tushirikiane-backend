'use client'
import {rem, Text, Title} from "@mantine/core"
import Image from "next/image";
import React from "react";
import {BoldWord} from "@/components/www/hero";
import {useMediaQuery} from "@mantine/hooks";

const OrganizeTasksPrioritizeGoalsAndGetThingsDone = () => {
    const isMobile = useMediaQuery("(max-width: 720px)")

    return (
        <section className="container mt-20 md:mt-40">
            <Title order={2} fw={550} size={rem(isMobile?22:38)} mb={isMobile?10:16} lh={1.2}>Organize tasks, prioritize <br/>goals
                and <BoldWord word={"get things done"}/> </Title>
            <Text c="dimmed">
                Streamline your workflow with powerful intuitive tools that ensure your team <br/>stays organized and
                focused
                on their tasks
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-40 mt-6 md:mt-8">
                {cardData.map((item, index) => (
                    <Cards {...item} key={index}/>
                ))}
            </div>

        </section>
    )
}

const cardData: { imgSrc: string | null, description: string }[] = [
    {imgSrc: "/one-time.svg", description: "Comprehensive Tools to optimize teamwork"},
    {imgSrc: "/work-in-progress.svg", description: "All you need to manage projects on one platform"},
    {imgSrc: "/usability-testing.svg", description: "Intuitive and easy to use interface for everyone"}
]

const Cards: React.FC<{ imgSrc: string | null, description: string }> = ({imgSrc = null, description}) => {
    const isMobile = useMediaQuery("(max-width: 720px)")
    return (
        <div className="flex flex-col items-center">
            <Image src={imgSrc ?? ""} alt={""} height={isMobile?150:280} width={isMobile?150:280}/>
            <Text mt={isMobile?6:8} size={rem(isMobile?14:18)}>{description}</Text>
        </div>
    )
}

export default OrganizeTasksPrioritizeGoalsAndGetThingsDone