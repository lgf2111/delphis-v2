import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaBook, FaCaretDown, FaSchool } from "react-icons/fa";
import { FaCircleDollarToSlot, FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle, IoMdTime } from "react-icons/io";

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

function Filters({ filters, setFilters }: FitlersProps) {
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
  interface TutorProps {
    imageUrl: string;
    profile: {
      name: string;
      subjects: string[];
    };
    intro: {
      certification: string;
      school: string;
      course: string;
      years: number;
    };
    timetable: Record<string, never>;
    location: string;
    price: number;
  }

  interface TutorCardProps extends TutorProps {
    id: number;
  }

  const tutors: TutorProps[] = [
    {
      imageUrl:
        "https://tutorcircle.sg/_next/image?url=https%3A%2F%2Ftutorcircle.sg%2Fold%2Ftutor_icon%2F471_tutor_icon.jpeg&w=1200&q=75",
      profile: {
        name: "Cayla",
        subjects: [],
      },
      intro: {
        certification: "High Dip",
        school: "SOMA",
        course: "Music Production and Engineering",
        years: 0,
      },
      timetable: {},
      location: "Singapore",
      price: 10,
    },
    {
      imageUrl:
        "https://tutorcircle.sg/_next/image?url=https%3A%2F%2Ftutorcircle.sg%2Fold%2Ftutor_icon%2F468_tutor_icon.jpeg&w=1200&q=75",
      profile: {
        name: "Gabriel",
        subjects: ["General Paper", "Maths", "Physics"],
      },
      intro: {
        certification: "Degree",
        school: "NUS",
        course: "Computer Science",
        years: 0,
      },
      timetable: {},
      location: "Singapore",
      price: 10,
    },
    {
      imageUrl:
        "https://tutorcircle.sg/_next/image?url=https%3A%2F%2Ftutorcircle.sg%2Fold%2Ftutor_icon%2F450_tutor_icon.jpeg&w=1200&q=75",
      profile: {
        name: "Isaac",
        subjects: ["English", "Chinese", "Elementary Maths"],
      },
      intro: {
        certification: "Degree",
        school: "SUSS",
        course: "Marketing",
        years: 0,
      },
      timetable: {},
      location: "Singapore",
      price: 10,
    },
  ];

  function TutorCard({
    id,
    imageUrl,
    profile,
    intro,
    timetable,
    location,
    price,
  }: TutorCardProps) {
    const [tab, setTab] = useState("Profile");
    return (
      <div className="card relative bg-base-100 shadow-xl">
        <Link href={`/tutor/${id}/profile`}>
          <div className="absolute rounded-none rounded-ss-2xl bg-black px-2 py-1 text-white">
            Tutor {id}
          </div>
          <figure>
            <img
              src={imageUrl}
              alt={profile.name}
              className="h-96 w-full rounded-t-2xl object-cover"
            />
          </figure>
          <div className="card-body">
            <div role="tablist" className="tabs tabs-bordered">
              <button
                role="tab"
                className={`tab ${tab === "Profile" && "tab-active"}`}
                onClick={() => setTab("Profile")}
              >
                Profile
              </button>
              <button
                role="tab"
                className={`tab ${tab === "Intro" && "tab-active"}`}
                onClick={() => setTab("Intro")}
              >
                Intro
              </button>
              <button
                role="tab"
                className={`tab ${tab === "Timetable" && "tab-active"}`}
                onClick={() => setTab("Timetable")}
              >
                Timetable
              </button>
            </div>
            <h2 className="card-title">{profile.name}</h2>
            {tab === "Profile" && (
              <>
                <p>{profile.subjects.join(", ")}</p>
                <div className="flex pt-5">
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <FaLocationDot />
                      <span>
                        {location}
                        <br />
                        Location
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <FaCircleDollarToSlot />
                      <span>
                        SGD ${price} Up
                        <br />
                        /hour
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tab === "Intro" && (
              <div className="grid grid-cols-2 grid-rows-2 pt-5">
                <div className="">
                  <div className="flex gap-1">
                    <FaLocationDot />
                    <span>{intro.certification}</span>
                  </div>
                </div>
                <div className="">
                  <div className="flex gap-1">
                    <FaSchool />
                    <span>{intro.school}</span>
                  </div>
                </div>
                <div className="">
                  <div className="flex gap-1">
                    <IoMdTime />
                    <span>{intro.years}</span>
                  </div>
                </div>
                <div className="">
                  <div className="flex gap-1">
                    {/* FIXME: size of FaBook not adjustable */}
                    <FaBook />
                    <span className="truncate">{intro.course}</span>
                  </div>
                </div>
              </div>
            )}
            {tab === "Timetable" && <p>...</p>}
          </div>
        </Link>
      </div>
    );
  }

  console.log(filters);
  function TutorCards() {
    let filteredTutors = [...tutors];
    if (filters.length > 0) {
      filteredTutors = tutors.filter((tutor) =>
        tutor.profile.subjects.some((subject) => filters.includes(subject)),
      );
    }
    return filteredTutors.map((tutor, index) => (
      <TutorCard key={index} id={index} {...tutor} />
    ));
  }

  return (
    <div className="">
      <div className="mb-5 text-center">
        <h1 className="text-lg font-bold">Find the best tutor for you</h1>
        <small>
          <span className="font-semibold text-primary">{tutors.length}</span>{" "}
          Tutors
        </small>
      </div>
      <div className="grid grid-cols-1 gap-3 px-24 md:grid-cols-2 lg:grid-cols-3">
        <TutorCards />
      </div>
    </div>
  );
}
