import { IconType } from "react-icons";
import { IoIosAlarm } from "react-icons/io";

export default function Home() {
  return (
    <main>
      <Hero />
      <Announcements />
      <Features />
      <Testimonials />
      <CTA />
    </main>
  );
}

function Hero() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Connect the best tutors for you.
          </h1>
          <p className="py-6">
            It helps you find top-notch tutors in Singapore.
          </p>
          <button className="btn btn-primary">Learn more</button>
        </div>
      </div>
    </div>
  );
}

function Announcements() {
  return (
    <>
      <h1 className="text-center text-lg font-medium">Latest Announcements</h1>
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
    </>
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
      <div className="flex-1">
        <Icon className="bg-primary rounded-xl p-1 text-white" size={50} />
        <h1 className="text-lg font-medium">{title}</h1>
        <p>{description}</p>
      </div>
    );
  };
  const features = [
    {
      Icon: IoIosAlarm,
      title: "Quality",
      description:
        "The tutors from Singapore's top three universities, and the performance and identities of all tutors are verified by professionals.",
    },
    {
      Icon: IoIosAlarm,
      title: "Quantity",
      description: "The number of tutors exceeds 100,000 globally.",
    },
    {
      Icon: IoIosAlarm,
      title: "Convenience",
      description:
        "You can choose the tutor who suits you best from the tutor's detailed information.",
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-lg font-medium">Why Choose Delphis?</h1>
        <small>
          The tutors from Singapore&apos;s top three universities, and the
          performance and identities of all tutors are verified by
          professionals. The number of tutors exceeds 100,000 globally.
        </small>
      </div>
      <div className="flex">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <>
      <h1 className="text-center text-lg font-medium">
        Listen to what students and parents have to say.
      </h1>
      <div className="px-5">
        <div className="chat chat-start">
          <div className="chat-image avatar">
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
          <div className="chat-image avatar">
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
          <div className="chat-image avatar">
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
    </>
  );
}

function CTA() {
  return (
    <div className="card bg-base-100 image-full p-5 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body text-center">
        <h1 className="card-title justify-center">What are you waiting for?</h1>
        <p>
          Seize the learning opportunity and get matched with your dedicated
          tutor now!
        </p>
        <div className="flex pt-5">
          <div className="flex-1">
            100+ <br />
            Offering varous subjects
          </div>
          <div className="flex-1">
            100,000+ <br />
            Elite tutors from Delphis
          </div>
          <div className="flex-1">
            24 hours <br />
            Instant customer service support
          </div>
        </div>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Learn more</button>
        </div>
      </div>
    </div>
  );
}
