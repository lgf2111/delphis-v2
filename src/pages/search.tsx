import React, { useEffect, useState } from "react";

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
import { calcMinRate, makeSubjectNames, subjects } from "~/utils/tutor";

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
  const [tutorCount, setTutorCount] = useState(0);

  type TutorCardProps = RouterOutputs["tutor"]["getAll"][number];
  function TutorCard(props: TutorCardProps) {
    const {
      id,
      name,
      locations,
      education,
      category,
      school,
      gradYear,
      photo,
      availability,
      introduction,
    } = props;

    const [tab, setTab] = useState("Profile");

    // const subjectNames = makeSubjectNames(subjects);
    // const minRate = calcMinRate(subjects);

    return (
      <div className="card relative bg-base-100 shadow-xl">
        <div className="absolute rounded-none rounded-ss-2xl bg-black/50 px-2 py-1 text-white">
          Tutor {id}
        </div>
        <Link href={`/tutor/${id}/profile`}>
          <figure>
            <img
              src={photo ?? "/images/default.jpg"}
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
              {/* <Statistic
                className="col-span-2"
                tip={`Teaching subjects: ${subjectNames}`}
                icon={<MdSubject />}
                value={subjectNames}
              /> */}
              <Statistic
                tip={`Location: ${locations.join(", ")}`}
                icon={<FaLocationDot />}
                value={locations.join(", ")}
              />

              {/* <Statistic
                tip={`Rate: Starting from $${minRate}/hour`}
                icon={<FaCircleDollarToSlot />}
                value={`$${minRate}/hour up`}
              /> */}
            </div>
          )}
          {tab === "Intro" && (
            <div className="grid grid-cols-2 grid-rows-2 pt-5">
              <Statistic
                tip={`Education: ${education}`}
                icon={<GrCertificate />}
                value={education}
              />
              <Statistic
                tip={`School: ${school}`}
                icon={<FaSchool />}
                value={school}
              />
              <Statistic
                tip={`Graduation Year: ${gradYear}`}
                icon={<IoMdTime />}
                value={gradYear}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  function TutorCards() {
    let filteredTutors = tutors;
    // filteredTutors = tutors?.filter((tutor) =>
    //   filters.every((filter) =>
    //     tutor.subjects.some(
    //       (subject) =>
    //         subject.name === filter || subject.level.includes(filter),
    //     ),
    //   ),
    // );

    useEffect(() => {
      setTutorCount(filteredTutors?.length ?? 0);
    }, [filteredTutors]);

    return filteredTutors?.map((tutor) => (
      <TutorCard key={tutor.id} {...tutor} />
    ));
  }

  return (
    <div className="">
      <div className="mb-5 flex flex-col gap-2 text-center">
        <h1 className="text-lg font-bold">Find the best tutor for you</h1>
        <small>
          <span className="font-semibold text-primary">{tutorCount}</span>{" "}
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
