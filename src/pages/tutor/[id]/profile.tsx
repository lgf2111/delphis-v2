import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaBook, FaLocationDot, FaSchool } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { RouterOutputs, api } from "~/utils/api";
import { formatDistance, subDays } from "date-fns";
import { FaCertificate } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";

// interface TutorDetails {
//   id: string;
//   imageUrl: string;
//   name: string;
//   school: string;
//   course: string;
//   years: number;
//   price: number;
//   introduction: string;
//   examination: { subject: string; examination: string; level: number }[];
//   highSchool: string;
//   location: string;
//   timetable: Record<string, never>;
//   tuition: { subject: string; rate: number }[];
// }

export default function TutorProfile() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>loading...</div>;
  }
  if (typeof id !== "string") {
    return <div>invalid id</div>;
  }
  // const tutorDetails: TutorDetails = {
  //   id: id,
  //   imageUrl:
  //     "https://tutorcircle.sg/_next/image?url=https%3A%2F%2Ftutorcircle.sg%2Fold%2Ftutor_icon%2F471_tutor_icon.jpeg&w=3840&q=75",
  //   name: "Cayla",
  //   school: "SOMA",
  //   course: "Music Profiction & Engineering",
  //   years: 0,
  //   price: 20,
  //   introduction: "",
  //   examination: [
  //     { subject: "English", examination: "PSLE", level: 4 },
  //     { subject: "Maths", examination: "PSLE", level: 5 },
  //     { subject: "Malay", examination: "PSLE", level: 2 },
  //   ],
  //   highSchool: "CHIG St Joseph's Convent",
  //   location: "Hougang",
  //   timetable: {},
  //   tuition: [
  //     { subject: "English", rate: 20 },
  //     { subject: "Maths", rate: 20 },
  //     { subject: "Malay", rate: 20 },
  //   ],
  // };

  const { data: details } = api.tutor.getById.useQuery({ id: parseInt(id) });

  console.log(details);

  if (!details) {
    // TODO: this will happen if cannot conenct to db, or no internet
    return <div>invalid details</div>;
  }

  return (
    <div className="flex flex-col gap-5 bg-slate-100 px-10 py-5">
      <Profile {...details} />
      <Others {...details} />
      {/* <Timetable {...details} /> */}
      {/* <Tuition {...details} /> */}
    </div>
  );
}

type DetailProps = RouterOutputs["tutor"]["getById"];
function Profile(props: DetailProps) {
  if (!props) {
    return <div>loading...</div>;
  }
  const {
    id,
    name,
    imageUrl,
    category,
    course,
    achievement,
    location,
    school,
    experience,
    price,
    introduction,
    createdAt,
    updatedAt,
    subjects,
  } = props;
  return (
    <div className="flex flex-col gap-6 bg-white p-12">
      <div className="flex gap-10">
        <div className="avatar">
          <div className="w-64 rounded">
            <img src={imageUrl} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">{name}</p>
          <div className="flex flex-col">
            <p className="flex items-baseline gap-1">
              <MdCategory />
              <span>{category}</span>
            </p>
            <p className="flex items-baseline gap-1">
              <FaLocationDot />
              <span>{location}</span>
            </p>
            <p className="flex items-baseline gap-1">
              <FaSchool />
              <span>{school}</span>
            </p>
            <p className="flex items-baseline gap-1">
              <GrCertificate />
              <span className="truncate">{achievement}</span>
            </p>
            <p className="flex items-baseline gap-1">
              <FaBook />
              <span className="truncate">{course}</span>
            </p>
            <p className="flex items-baseline gap-1">
              <IoMdTime />
              <span>{experience}</span>
            </p>
          </div>
          <p>
            From{" "}
            <span className="text-2xl font-medium text-primary">${price}</span>{" "}
            per hour
          </p>
          <small>
            Updated{" "}
            {formatDistance(subDays(updatedAt, 3), new Date(), {
              addSuffix: true,
            })}
            , joined{" "}
            {formatDistance(subDays(createdAt, 3), new Date(), {
              addSuffix: true,
            })}
          </small>
        </div>
      </div>

      <div className="">
        <h1 className="text-lg font-bold">Introduction</h1>
        {introduction ?? "This tutor has yet to provide an introduction."}
      </div>
      <h1 className="text-lg font-bold">Teaching Subjects</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Rate ($/h)</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.name}</td>
                <td>{subject.grade}</td>
                <td>{subject.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Others(props: DetailProps) {
  if (!props) {
    return <div>loading...</div>;
  }
  const { location } = props;
  return (
    <div className="bg-white">
      <h1 className="text-lg font-bold">High School</h1>
      {/* <p>{tutorDetails.highSchool}</p> */}
      <h1 className="text-lg font-bold">Living Location</h1>
      <p>{location}</p>
    </div>
  );
}

function Timetable(props: DetailProps) {
  return (
    <div className="bg-white">
      <h1 className="text-lg font-bold">Available Timeslot</h1>
    </div>
  );
}

// function Tuition(props: DetailProps) {
//   const [tuition, setTuition] = useState(tutorDetails.tuition[0]);
//   const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedSubject = event.target.value;
//     const selectedTuition = tutorDetails.tuition.find(
//       (tuition) => tuition.subject === selectedSubject,
//     );
//     setTuition(selectedTuition);
//   };

//   return (
//     <div className="bg-white">
//       <h1 className="text-2xl font-bold">{tuition?.subject}</h1>
//       Hourly Rate ${tuition?.rate} <br />
//       Tutorial Format
//       <hr />
//       <h1 className="text-xl">Book</h1>
//       <h2 className="text-lg">Subject</h2>
//       <select onChange={handleSubjectChange}>
//         {tutorDetails.tuition.map((service, index) => (
//           <option key={index}>{service.subject}</option>
//         ))}
//       </select>
//       <h2 className="text-lg">Expected Fee</h2>
//       <p>
//         The actual tutorial fees may vary depending on the student grade and
//         transportation in different regions.
//       </p>
//     </div>
//   );
// }
