import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

export default function Search() {
  return (
    <>
      <Filters />
      <Tutors />
    </>
  );
}

function Filters() {
  const [filters, setFilters] = useState<string[]>([]);

  const onClick = (newFilter: string) => {
    if (!filters.includes(newFilter)) {
      setFilters([...filters, newFilter]);
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
              onClick={() => onClick(item)}
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
      <div className="flex justify-center gap-2 py-5">
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

function Tutors() {
  function TutorCard() {
    const [tab, setTab] = useState("Profile");
    return (
      <div className="card bg-base-100 w-1/2 shadow-xl md:w-1/3 lg:w-1/4">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body overflow-hidden">
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
          <h2 className="card-title">Gabriel</h2>
          {tab === "Profile" && <p>General Paper, Maths, Physics</p>}
          {tab === "Intro" && <p>Degree in NUS</p>}
          {tab === "Timetable" && <p>...</p>}
          <div className="flex pt-5">
            <div className="flex-1">
              <div className="flex gap-1">
                <MdLocationOn />
                <span>
                  -
                  <br />
                  Location
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-1">
                <FaCircleDollarToSlot />
                <span>
                  SGD $10 Up
                  <br />
                  /hour
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-5">
      <h1 className="text-lg font-bold">Find the best tutor for you</h1>
      <small>266 Tutors</small>
      <div className="flex flex-wrap gap-3">
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
      </div>
    </div>
  );
}
