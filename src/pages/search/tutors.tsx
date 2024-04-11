import Link from "next/link";
import { useState } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import Statistic from "../components/statistic";
import { MdSubject } from "react-icons/md";
import {
  FaBook,
  FaCircleDollarToSlot,
  FaLocationDot,
  FaSchool,
} from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { IoIosInformationCircleOutline, IoMdTime } from "react-icons/io";
import Spinner from "../components/spinner";

export default function Tutors({ filters }: { filters: string[] }) {
  const { data: tutors, isLoading } = api.tutor.getAll.useQuery();

  type TutorCardProps = RouterOutputs["tutor"]["getAll"][number];
  function TutorCard(props: TutorCardProps) {
    const {
      id,
      name,
      imageUrl,
      achievement,
      course,
      school,
      experience,
      location,
      subjects,
    } = props;
    const [tab, setTab] = useState("Profile");
    const subjects_ = subjects.map((subject) => subject.name).join(", ");
    const minRate = Math.min(...subjects.map((subject) => subject.rate));

    return (
      <div className="card relative bg-base-100 shadow-xl">
        <div className="absolute rounded-none rounded-ss-2xl bg-black/50 px-2 py-1 text-white">
          Tutor {id}
        </div>
        <Link href={`/tutor/${id}/profile`}>
          <figure>
            <img
              src={imageUrl}
              alt={name}
              className="h-96 w-full rounded-t-2xl object-cover"
            />
          </figure>
        </Link>

        <div className="card-body overflow-scroll">
          <div role="tablist" className="tabs tabs-bordered">
            {["Profile", "Intro"].map((item) => (
              <button
                key={item}
                role="tab"
                className={`tab ${tab === item && "tab-active"}`}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <h2 className="card-title">{name}</h2>
          {tab === "Profile" && (
            <div className="grid grid-cols-2 grid-rows-2 pt-5">
              <Statistic
                className="col-span-2"
                tip={`Teaching subjects: ${subjects_}`}
                icon={<MdSubject />}
                value={subjects_}
              />
              <Statistic
                tip={`Location: ${location}`}
                icon={<FaLocationDot />}
                value={location}
              />

              <Statistic
                tip={`Rate: Starting from $${minRate}/hour`}
                icon={<FaCircleDollarToSlot />}
                value={`$${minRate}/hour up`}
              />
            </div>
          )}
          {tab === "Intro" && (
            <div className="grid grid-cols-2 grid-rows-2 pt-5">
              <Statistic
                tip={`Achievement: ${achievement}`}
                icon={<GrCertificate />}
                value={achievement}
              />
              <Statistic
                tip={`School: ${school}`}
                icon={<FaSchool />}
                value={school}
              />
              <Statistic
                tip={`Experience: ${experience}`}
                icon={<IoMdTime />}
                value={experience}
              />
              <Statistic
                tip={`Course: ${course}`}
                icon={<FaBook />}
                value={course}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  function TutorCards() {
    const filteredTutors = tutors;

    // let filteredTutors = [...tutors];
    // if (filters.length > 0) {
    //   filteredTutors = tutors.filter((tutor) =>
    //     tutor.profile.subjects.some((subject) => filters.includes(subject)),
    //   );
    // }
    return filteredTutors?.map((tutor) => (
      <TutorCard key={tutor.id} {...tutor} />
    ));
  }

  return (
    <div className="">
      <div className="mb-5 flex flex-col gap-2 text-center">
        <h1 className="text-lg font-bold">Find the best tutor for you</h1>
        <small>
          <span className="font-semibold text-primary">
            {tutors ? tutors.length : "0"}
          </span>{" "}
          Tutors
        </small>
        <div className="alert alert-info flex max-w-96 gap-2 self-center">
          <IoIosInformationCircleOutline size={30} />
          Below are just sample tutors, real tutors will be added once released.
        </div>
        <br />
      </div>
      <div className="grid grid-cols-1 gap-3 px-24 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? <Spinner /> : <TutorCards />}
      </div>
    </div>
  );
}
