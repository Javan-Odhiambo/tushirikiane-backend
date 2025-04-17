"use client";
import { rem, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Joy",
    image: "/african-woman.jpg",
    description:
      "Tushirikiane has revolutionized how we manage our community projects. The intuitive interface and powerful features have made collaboration seamless. Our team's productivity has increased by 40% since we started using this platform.",
  },
  {
    name: "Michael Baraka",
    image: "/man-with-hat.jpg",
    description:
      "As a project manager, I've tried many tools, but Tushirikiane stands out for its reliability and user-friendly design. The customer support team is exceptional - they're always ready to help and provide valuable insights.",
  },
  {
    name: "Amina Salim",
    image: "/african-american-woman.jpg",
    description:
      "The analytics and reporting features have given us incredible insights into our community engagement. We've been able to make data-driven decisions that have increased our outreach program participation by 60%.",
  },
  {
    name: "David Ronney",
    image: "/young-handsome-man.jpg",
    description:
      "What impressed me most was how quickly we could get started. The onboarding process was smooth, and the platform's flexibility allowed us to customize it to our specific needs. It's been a game-changer for our organization.",
  },
];

const Testimonials = () => {
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <section className="relative py-16 mt-20">
      <div className="absolute inset-0 -z-10">
        {/* Top gradient - more opaque */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white via-white to-transparent"></div>

        {/* Bottom gradient - less opaque */}
        <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-white to-transparent"></div>

        <Image
          src={"/group-vector.svg"}
          fill
          alt="Background pattern"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="container mx-auto px-4">
        <Title
          order={2}
          fw={550}
          size={isMobile ? rem(24) : rem(38)}
          mb={16}
          lh={1.2}
        >
          See what people <br />
          say about us{" "}
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="shadow-md p-4 mb-2 bg-[#E5E9FF] rounded-2xl"
            >
              <Image
                width={isMobile ? 50 : 100}
                height={isMobile ? 50 : 100}
                src={testimonial.image}
                alt={testimonial.name}
                className="rounded-full border-2 border-blue-500"
                style={{ marginBottom: 16 }}
              />
              <Text className="text-sm line-clamp-3" mb={6}>
                {testimonial.description}
              </Text>
              <Title order={isMobile ? 5 : 4} className="text-sm font-bold">
                {testimonial.name}
              </Title>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
