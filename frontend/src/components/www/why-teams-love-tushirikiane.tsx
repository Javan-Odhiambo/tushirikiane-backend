"use client";
import { rem, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

const statsData: { number: number | string; description: string }[] = [
  {
    number: 87,
    description: "Users report improved task completion rates",
  },
  {
    number: 92,
    description: "Teams experience better deadline adherence",
  },
  {
    number: 78,
    description: "Reduction in miscommunication incidents",
  },
  {
    number: 94,
    description: "Users find it easier to prioritize work",
  },
];

const StatCard: React.FC<{ number: number | string; description: string }> = ({
  number,
  description,
}) => {
  const isMobile = useMediaQuery("(max-width: 720px)");
  const [count, setCount] = useState(0);
  const targetNumber = typeof number === "number" ? number : parseInt(number);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    const interval = duration / steps;

    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return (
    <div className="flex flex-col py-8">
      <Text size={rem(isMobile ? 40 : 60)} c={"skyBlue"}>
        {`${count} %`}
      </Text>
      <Text lineClamp={3} size={rem(isMobile ? 14 : 16)} mt={isMobile ? 6 : 12}>
        {description}
      </Text>
    </div>
  );
};

const WhyTeamsLoveUs = () => {
  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <section className="container text-center mt-[150px]">
      <Title
        order={2}
        fw={550}
        size={rem(isMobile ? 22 : 24)}
        mb={isMobile ? 12 : 24}
      >
        Why teams love Tushirikiane
      </Title>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
        {statsData.map((item, index) => (
          <StatCard {...item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default WhyTeamsLoveUs;
