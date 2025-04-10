"use client";
import { Group, rem, Text, Title } from "@mantine/core";
import Image from "next/image";
import { BoldWord } from "@/components/www/hero";
import { useMediaQuery } from "@mantine/hooks";

const taskManagementFeature = [
  {
    title: "Create Boards & Organize Tasks",
    description:
      "Structure your projects with to-do lists, in-progress tasks, and completed work",
  },
  {
    title: "Assign & Track Progress",
    description:
      "Keep everyone accountable by assigning tasks and tracking updates in real time.",
  },
  {
    title: "Set Deadlines & Prioritize",
    description:
      "Ensure tasks get done on time with clear priorities and due dates.",
  },
  {
    title: "Mark Tasks as Completed",
    description: "Celebrate progress and keep moving forward.",
  },
];

const StayOnTopOfYourTasksEffortlessly = () => {
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <section className="container mt-40 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
      <Image
        src={"/add-tasks.svg"}
        alt={"add tasks"}
        height={isMobile ? 250 : 450}
        width={isMobile ? 250 : 450}
      />
      <div className="flex-1">
        <Title
          order={2}
          fw={550}
          size={rem(isMobile ? 22 : 38)}
          mb={isMobile ? 10 : 16}
          lh={1.2}
        >
          Stay on top of your tasks <br /> <BoldWord word={"effortlessly"} />{" "}
        </Title>
        <Text c="dimmed" mb={6}>
          Our task management system is designed to keep your projects organized
          and your team aligned with powerful task tracking and management
          tools. We feature user friendly interfaces so you can easily manage
          responsibilities and milestones and be in control.
        </Text>
        <div className="flex flex-col gap-4">
          {taskManagementFeature.map((feature, index) => (
            <Group
              key={index}
              flex={"row"}
              gap={isMobile ? 10 : 20}
              align={"flex-start"}
            >
              <Image
                src={"/tick.svg"}
                width={isMobile ? 20 : 30}
                height={isMobile ? 20 : 30}
                alt="tick mark"
              />
              <div className="flex-1 gap-2 ">
                <Title
                  order={3}
                  fw={isMobile ? 450 : 550}
                  size={rem(isMobile ? 16 : 22)}
                  lh={1.2}
                >
                  {feature.title}
                </Title>
                <Text c="dimmed">{feature.description}</Text>
              </div>
            </Group>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayOnTopOfYourTasksEffortlessly;
