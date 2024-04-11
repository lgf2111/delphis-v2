import { IconType } from "react-icons";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { MdAutoAwesome } from "react-icons/md";

export default function Features() {
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
