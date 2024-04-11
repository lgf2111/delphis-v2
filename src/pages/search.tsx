import React, { useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import Modal from "~/components/modal";
import { IoIosCloseCircle } from "react-icons/io";

import Link from "next/link";
import { type RouterOutputs, api } from "~/utils/api";
import Statistic from "~/components/statistic";
import { MdSubject } from "react-icons/md";
import {
  FaBook,
  FaCircleDollarToSlot,
  FaLocationDot,
  FaSchool,
} from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { IoIosInformationCircleOutline, IoMdTime } from "react-icons/io";
import Spinner from "~/components/spinner";
import { calcMinRate } from "~/helpers/rate";

export default function Search() {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-5 py-10">
      <Filters filters={filters} setFilters={setFilters} />
      <Tutors filters={filters} />
    </div>
  );
}

interface FitlersProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

// FIXME: Same for the “Level” button
function Filters(props: FitlersProps) {
  const { filters, setFilters } = props;

  const handleClick = (newFilter: string) => {
    if (!filters.includes(newFilter)) {
      setFilters([...filters, newFilter]);
      return;
    }
    setFilters((filters) => filters.filter((item) => item !== newFilter));
  };

  function Card({ filter }: { filter: { title: string; items: string[] } }) {
    return (
      <div>
        <h3 className="pb-2 text-lg font-bold">{filter.title}</h3>
        <div className="flex flex-wrap gap-1">
          {filter.items.map((item, index) => (
            <button
              key={index}
              className={`btn btn-sm ${filters.includes(item) && "btn-secondary"}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function Subject() {
    const subjects = [
      {
        title: "O & N Level",
        items: [
          "English",
          "Mother Tongue",
          "H. Mother Tongue",
          "Mother Tongue B",
          "Third Language",
          "E. Maths",
          "A. Maths",
          "POA",
          "P. Biology",
          "P. Physics",
          "P. Chemistry",
          "CS (Chem/Bio)",
          "CS (Chem/Phy)",
          "CS (Bio/Phy)",
          "P. Literature",
          "P. Geography",
          "P. History",
          "CH (SS/Lit)",
          "CH (SS/His)",
          "CH (SS/Lit in MT)",
          "D&T",
          "F&N",
          "Art",
          "Music",
          "H. Art",
          "H. Music",
          "Drama",
          "Computing",
          "Electronics",
        ],
      },
      {
        title: "PSLE",
        items: [
          "English",
          "Mother Tongue",
          "H. Mother Tongue",
          "Maths",
          "Science",
          "Social Studies",
        ],
      },
    ];

    // FIXME: When selecting the subjects, the first button is outlined & wont disappear after selecting other subjects
    return (
      <Modal
        button={
          <>
            Subject <FaCaretDown />
          </>
        }
      >
        <div className="flex flex-col gap-5">
          {subjects.map((subject, index) => (
            <Card filter={subject} key={index} />
          ))}
        </div>
      </Modal>
    );
  }
  // TODO: update location button
  function Location() {
    return (
      <Modal
        button={
          <>
            Location <FaCaretDown />
          </>
        }
        buttonClassName="btn-disabled"
        showClose
      >
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </Modal>
    );
  }
  function Level() {
    const levels = [
      { title: "Secondary School", items: ["S1", "S2", "S3", "S4", "S5"] },
      { title: "Primary School", items: ["P1", "P2", "P3", "P4", "P5", "P6"] },
    ];
    return (
      <Modal
        button={
          <>
            Level <FaCaretDown />
          </>
        }
      >
        <div className="flex flex-col gap-5">
          {levels.map((level, index) => (
            <Card filter={level} key={index} />
          ))}
        </div>
      </Modal>
    );
  }
  // TODO: update price filter
  function Others() {
    return (
      <Modal
        button={
          <>
            Others <FaCaretDown />
          </>
        }
        buttonClassName="btn-disabled"
      >
        <h3 className="text-lg font-bold">Expected Fee</h3>
      </Modal>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex gap-4 overflow-scroll">
          <Subject />
          <Location />
          <Level />
          <Others />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="badge badge-outline badge-lg"
            onClick={() =>
              setFilters((filters) => filters.filter((item) => item !== filter))
            }
          >
            {filter}&nbsp;
            <IoIosCloseCircle />
          </button>
        ))}
      </div>
    </>
  );
}

function Tutors({ filters }: { filters: string[] }) {
  const { data: tutors, isLoading } = api.tutor.getAll.useQuery();

  type TutorCardProps = RouterOutputs["tutor"]["getAll"][number];
  function TutorCard(props: TutorCardProps) {
    const {
      id,
      name,
      imageUrl,
      qualification,
      course,
      school,
      experience,
      location,
      subjects,
    } = props;

    const [tab, setTab] = useState("Profile");

    const subjectNames = subjects.map((subject) => subject.name).join(", ");
    const minRate = calcMinRate(subjects);

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
                tip={`Teaching subjects: ${subjectNames}`}
                icon={<MdSubject />}
                value={subjectNames}
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
                tip={`Qualification: ${qualification}`}
                icon={<GrCertificate />}
                value={qualification}
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
              {course && (
                <Statistic
                  tip={`Course: ${course}`}
                  icon={<FaBook />}
                  value={course}
                />
              )}
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
