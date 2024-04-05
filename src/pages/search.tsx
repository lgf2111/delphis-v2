import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaBook, FaCaretDown, FaSchool } from "react-icons/fa";
import { FaCircleDollarToSlot, FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle, IoMdTime } from "react-icons/io";
import { RouterOutputs, api } from "~/utils/api";
import Spinner from "./components/spinner";
import { GrCertificate } from "react-icons/gr";
import Statistic from "./components/statistic";
import { MdSubject } from "react-icons/md";

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
    const modalRef = useRef<HTMLDialogElement | null>(null);
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

    return (
      <>
        <button className="btn" onClick={() => modalRef.current?.showModal()}>
          Subject <FaCaretDown />
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box flex flex-col gap-5">
            {subjects.map((subject, index) => (
              <Card filter={subject} key={index} />
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }
  // TODO: update location button
  function Location() {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    return (
      <>
        <button
          className="btn"
          onClick={() => modalRef.current?.showModal()}
          disabled
        >
          Location <FaCaretDown />
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }
  function Grade() {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const grades = [
      { title: "Secondary School", items: ["S1", "S2", "S3", "S4", "S5"] },
      { title: "Primary School", items: ["P1", "P2", "P3", "P4", "P5", "P6"] },
    ];
    return (
      <>
        <button className="btn" onClick={() => modalRef.current?.showModal()}>
          Grade <FaCaretDown />
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box flex flex-col gap-5">
            {grades.map((grade, index) => (
              <Card filter={grade} key={index} />
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }
  // TODO: update price filter
  function Others() {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    return (
      <>
        <button
          className="btn"
          onClick={() => modalRef.current?.showModal()}
          disabled
        >
          Others <FaCaretDown />
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Expected Fee</h3>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-4">
        <Subject />
        <Location />
        <Grade />
        <Others />
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
      achievement,
      course,
      school,
      experience,
      location,
      price,
      subjects,
    } = props;
    const [tab, setTab] = useState("Profile");
    const subjects_ = subjects.map((subject) => subject.name).join(", ");
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

        <div className="card-body">
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
                tip={`Rate: Starting from $${price}/hour`}
                icon={<FaCircleDollarToSlot />}
                value={`$${price}/hour up`}
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
      <div className="mb-5 text-center">
        <h1 className="text-lg font-bold">Find the best tutor for you</h1>
        <small>
          <span className="font-semibold text-primary">
            {tutors ? tutors.length : "0"}
          </span>{" "}
          Tutors
        </small>
      </div>
      <div className="grid grid-cols-1 gap-3 px-24 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? <Spinner /> : <TutorCards />}
      </div>
    </div>
  );
}
