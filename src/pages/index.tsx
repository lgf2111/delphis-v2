import { type IconType } from "react-icons";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosAlarm, IoIosTimer } from "react-icons/io";
import { MdAutoAwesome } from "react-icons/md";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 py-10">
      <Hero />
      {/* <Announcements /> */}
      <Features />
      {/* <Testimonials /> */}
      <CTA />
    </main>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content flex-col gap-6 lg:flex-row">
        <div>
          <h1 className="text-5xl font-bold">Find your desired tutors here</h1>
          <ul className="list-inside list-disc py-6 text-justify">
            <li>Take customisable 1-on-1 lessons trusted by many users</li>
            <li>Learn from tutors that fit your budget and schedule</li>
            <li>Wide variety of tutors and subject for you to choose from</li>
          </ul>
          <a
            className="btn btn-primary px-10"
            href="https://form.jotform.com/240903353188053"
            target="_blank"
          >
            Learn more
          </a>
        </div>
        <img src="/Landing.png" className="max-w-sm rounded-lg" />
      </div>
    </div>
  );
}

function Announcements() {
  return (
    <div>
      <h1 className="text-center text-lg font-bold">Latest Announcements</h1>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
            className="w-full"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
            className="w-full"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
}

function Features() {
  interface FeatureProps {
    Icon: IconType;
    title: string;
    description: string;
  }
  const Feature = ({ Icon, title, description }: FeatureProps) => {
    return (
      <div className="flex flex-1 flex-col flex-wrap items-center px-3 text-center">
        <Icon className="rounded-xl bg-primary p-3 text-white" size={75} />
        <h1 className="mt-2 text-lg font-bold">{title}</h1>
        <p className="">{description}</p>
      </div>
    );
  };
  const features = [
    {
      Icon: FaChalkboardTeacher,
      title: "Choose ideal tutor",
      description: "Find tutors best suited for you yourself.",
    },
    {
      Icon: MdAutoAwesome,
      title: "Free matching service",
      description: "Find tutors best suited for you automatically.",
    },
    {
      Icon: IoIosTimer,
      title: "Free trial lesson",
      description: "Tutors will be assigned to your for free trial lesson.",
    },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-lg font-bold">Why Choose Delphis?</h1>
      <div className="flex flex-col gap-10 pt-5 sm:flex-row">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div>
      <h1 className="text-center text-lg font-bold">
        Listen to what students and parents have to say.
      </h1>
      <div className="px-5">
        <div className="chat chat-start">
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble">
            Emma <br />
            H2 Chemistry and H2 Math <br />
            <q>It was said that you would, destroy the Sith, not join them.</q>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble">
            Sherry <br />
            JC1 H2 Biology <br />
            <q>It was you who would bring balance to the Force</q>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble">
            Jacky <br />
            OL Combined Science (physics/chem) <br />
            <q>Not leave it in Darkness</q>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className="card image-full bg-base-100 p-5 shadow-xl">
      <figure></figure>
      <div className="card-body text-center">
        <p>What are you waiting for?</p>
        <h1 className="card-title justify-center">
          Seize the learning opportunity and get matched with your dedicated
          tutor now!
        </h1>
        <div className="flex flex-col gap-10 py-5 sm:flex-row">
          <div className="flex-1">
            <span className="text-xl font-bold">10+</span>
            <br />
            Offering varous subjects
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">20+</span>
            <br />
            Tutors from Delphis
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">24 hours</span>
            <br />
            Customer service support
          </div>
        </div>
        <div className="card-actions justify-center">
          <a
            className="btn btn-primary px-10"
            href="https://form.jotform.com/240903353188053"
            target="_blank"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
