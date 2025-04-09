import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import WhyTeamsLoveUs from "@/components/www/why-teams-love-tushirikiane";
import Header from "@/components/www/header";
import Hero from "@/components/www/hero";
import OrganizeTasksPrioritizeGoalsAndGetThingsDone from "@/components/www/organize-tasks-prioritize-goals-and-get-things-done";
import OneTimePaymentLifetimeProductivity from "@/components/www/one-time-payment-lifetime-productivity";
import StayOnTopOfYourTasksEffortlessly from "@/components/www/stay-on-top-of-your-tasks-effortlessly";
import Testimonials from "@/components/www/testimonials";
import { URLS } from "@/lib/urls";
import ReadytoWork from "@/components/www/ready-to-work";
import Footer from "@/components/www/footer";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect(URLS.dashboard);
  }
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyTeamsLoveUs />
        <OrganizeTasksPrioritizeGoalsAndGetThingsDone />
        <OneTimePaymentLifetimeProductivity />
        <StayOnTopOfYourTasksEffortlessly />
        <Testimonials />
        <ReadytoWork />
        <Footer />
      </main>
    </>
  );
}
