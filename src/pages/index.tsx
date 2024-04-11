import Hero from "./index/hero";
import Announcements from "./index/announcement";
import Features from "./index/features";
import Testimonials from "./index/testimonials";
import CallToAction from "./index/callToAction";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 py-10">
      <Hero />
      {/* <Announcements /> */}
      <Features />
      {/* <Testimonials /> */}
      <CallToAction />
    </main>
  );
}
