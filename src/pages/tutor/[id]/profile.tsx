import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaBook, FaLocationDot, FaSchool } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";

interface TutorDetails {
  id: string;
  imageUrl: string;
  name: string;
  school: string;
  course: string;
  years: number;
  price: number;
  introduction: string;
  examination: { subject: string; examination: string; level: number }[];
  highSchool: string;
  location: string;
  timetable: Record<string, never>;
  tuition: { subject: string; rate: number }[];
}

export default function TutorProfile() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>loading...</div>;
  }
  if (typeof id !== "string") {
    return <div>invalid id</div>;
  }
  const tutorDetails: TutorDetails = {
    id: id,
    imageUrl:
      "https://tutorcircle.sg/_next/image?url=https%3A%2F%2Ftutorcircle.sg%2Fold%2Ftutor_icon%2F471_tutor_icon.jpeg&w=3840&q=75",
    name: "Cayla",
    school: "SOMA",
    course: "Music Profiction & Engineering",
    years: 0,
    price: 20,
    introduction: "",
    examination: [
      { subject: "English", examination: "PSLE", level: 4 },
      { subject: "Maths", examination: "PSLE", level: 5 },
      { subject: "Malay", examination: "PSLE", level: 2 },
    ],
    highSchool: "CHIG St Joseph's Convent",
    location: "Hougang",
    timetable: {},
    tuition: [
      { subject: "English", rate: 20 },
      { subject: "Maths", rate: 20 },
      { subject: "Malay", rate: 20 },
    ],
  };
  return (
    <div className="flex flex-col gap-5 bg-slate-100 px-10 py-5">
      <Profile tutorDetails={tutorDetails} />
      <Others tutorDetails={tutorDetails} />
      <Timetable tutorDetails={tutorDetails} />
      <Tuition tutorDetails={tutorDetails} />
    </div>
  );
}

function Profile({ tutorDetails }: { tutorDetails: TutorDetails }) {
  return (
    <div className="bg-white">
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={tutorDetails.imageUrl} />
        </div>
      </div>
      <div className="text-2xl font-bold">{tutorDetails.name}</div>
      <div className="flex flex-col">
        <div className="flex gap-1">
          <FaSchool />
          <span>{tutorDetails.school}</span>
        </div>
        <div className="flex gap-1">
          {/* FIXME: size of FaBook not adjustable */}
          <FaBook />
          <span className="truncate">{tutorDetails.course}</span>
        </div>
        <div className="flex gap-1">
          <IoMdTime />
          <span>{tutorDetails.years}</span>
        </div>
      </div>
      ${tutorDetails.price}/hour
      <div className="min-h-16">
        <h1 className="text-lg font-bold">Introduction</h1>
        <p>{tutorDetails.introduction}</p>
      </div>
      <h1 className="text-lg font-bold">Examination</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Examination</th>
              <th>Level Color</th>
            </tr>
          </thead>
          <tbody>
            {tutorDetails.examination.map((exam, index) => (
              <tr key={index}>
                <td>{exam.subject}</td>
                <td>{exam.examination}</td>
                <td>{exam.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Others({ tutorDetails }: { tutorDetails: TutorDetails }) {
  return (
    <div className="bg-white">
      <h1 className="text-lg font-bold">High School</h1>
      <p>{tutorDetails.highSchool}</p>
      <h1 className="text-lg font-bold">Living Location</h1>
      <p>{tutorDetails.location}</p>
    </div>
  );
}

function Timetable({ tutorDetails }: { tutorDetails: TutorDetails }) {
  return (
    <div className="bg-white">
      <h1 className="text-lg font-bold">Available Timeslot</h1>
    </div>
  );
}

function Tuition({ tutorDetails }: { tutorDetails: TutorDetails }) {
  const [tuition, setTuition] = useState(tutorDetails.tuition[0]);
  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubject = event.target.value;
    const selectedTuition = tutorDetails.tuition.find(
      (tuition) => tuition.subject === selectedSubject,
    );
    setTuition(selectedTuition);
  };

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold">{tuition?.subject}</h1>
      Hourly Rate ${tuition?.rate} <br />
      Tutorial Format
      <hr />
      <h1 className="text-xl">Book</h1>
      <h2 className="text-lg">Subject</h2>
      <select onChange={handleSubjectChange}>
        {tutorDetails.tuition.map((service, index) => (
          <option key={index}>{service.subject}</option>
        ))}
      </select>
      <h2 className="text-lg">Expected Fee</h2>
      <p>
        The actual tutorial fees may vary depending on the student grade and
        transportation in different regions.
      </p>
    </div>
  );
}
