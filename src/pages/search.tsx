import React, { useRef, useState } from "react";

export default function Search() {
  return (
    <>
      <Filters />
      <Tutors />
    </>
  );
}

function Filters() {
  function Subject() {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    return (
      <>
        <button className="btn" onClick={() => modalRef.current?.showModal()}>
          Subject
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box flex flex-col gap-5">
            {/* <h3 className="text-lg font-bold">A Level</h3> */}
            <div className="">
              <h3 className="pb-2 text-lg font-bold">O & N Level</h3>
              <div className="flex flex-wrap gap-1">
                <button className="btn btn-sm">English</button>
                <button className="btn btn-sm">Mother Tongue</button>
                <button className="btn btn-sm">H. Mother Tongue</button>
                <button className="btn btn-sm">Mother Tongue B</button>
                <button className="btn btn-sm">Third Language</button>
                <button className="btn btn-sm">E. Maths</button>
                <button className="btn btn-sm">A. Maths</button>
                <button className="btn btn-sm">POA</button>
                <button className="btn btn-sm">P. Biology</button>
                <button className="btn btn-sm">P. Physics</button>
                <button className="btn btn-sm">P. Chemistry</button>
                <button className="btn btn-sm">CS (Chem/Bio)</button>
                <button className="btn btn-sm">CS (Chem/Phy)</button>
                <button className="btn btn-sm">CS (Bio/Phy)</button>
                <button className="btn btn-sm">P. Literature</button>
                <button className="btn btn-sm">P. Geography</button>
                <button className="btn btn-sm">P. History</button>
                <button className="btn btn-sm">CH (SS/Lit)</button>
                <button className="btn btn-sm">CH (SS/His)</button>
                <button className="btn btn-sm">CH (SS/Lit in MT)</button>
                <button className="btn btn-sm">D&T</button>
                <button className="btn btn-sm">F&N</button>
                <button className="btn btn-sm">Art</button>
                <button className="btn btn-sm">Music</button>
                <button className="btn btn-sm">H. Art</button>
                <button className="btn btn-sm">H. Music</button>
                <button className="btn btn-sm">Drama</button>
                <button className="btn btn-sm">Computing</button>
                <button className="btn btn-sm">Electronics</button>
              </div>
            </div>
            <div className="">
              <h3 className="pb-2 text-lg font-bold">PSLE</h3>
              <div className="flex flex-wrap gap-1">
                <button className="btn btn-sm">English</button>
                <button className="btn btn-sm">Mother Tongue</button>
                <button className="btn btn-sm">H. Mother Tongue</button>
                <button className="btn btn-sm">Maths</button>
                <button className="btn btn-sm">Science</button>
                <button className="btn btn-sm">Social Studies</button>
              </div>
            </div>
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
        <button className="btn" onClick={() => modalRef.current?.showModal()}>
          Location
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
    return (
      <>
        <button className="btn" onClick={() => modalRef.current?.showModal()}>
          Grade
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box flex flex-col gap-5">
            <div className="">
              <h3 className="pb-2 text-lg font-bold">Secondary School</h3>
              <div className="flex flex-wrap gap-1">
                <button className="btn btn-sm">S1</button>
                <button className="btn btn-sm">S2</button>
                <button className="btn btn-sm">S3</button>
                <button className="btn btn-sm">S4</button>
                <button className="btn btn-sm">S5</button>
              </div>
            </div>
            <div className="">
              <h3 className="pb-2 pt-5 text-lg font-bold">Primary School</h3>
              <div className="flex flex-wrap gap-1">
                <button className="btn btn-sm">P1</button>
                <button className="btn btn-sm">P2</button>
                <button className="btn btn-sm">P3</button>
                <button className="btn btn-sm">P4</button>
                <button className="btn btn-sm">P5</button>
                <button className="btn btn-sm">P6</button>
              </div>
            </div>
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
        <button className="btn" onClick={() => modalRef.current?.showModal()}>
          Others
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
      <Subject />
      <Location />
      <Grade />
      <Others />
    </>
  );
}

function Tutors() {
  function TutorCard() {
    const [tab, setTab] = useState("Profile");
    return (
      <div className="card bg-base-100 w-1/4 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
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
          <h2 className="card-title">Gabriel</h2>
          {tab === "Profile" && <p>General Paper, Maths, Physics</p>}
          {tab === "Intro" && <p>Degree in NUS</p>}
          {tab === "Timetable" && <p>...</p>}
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-lg font-bold">Find the best tutor for you</h1>
      <small>266 Tutors</small>
      <div className="flex flex-wrap gap-3">
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
      </div>
    </>
  );
}
