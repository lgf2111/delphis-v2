import { useRouter } from "next/router";
import React from "react";
import { FaBook, FaLocationDot, FaSchool } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { type RouterOutputs, api } from "~/utils/api";
import { formatDistance, subDays } from "date-fns";
import { GrCertificate } from "react-icons/gr";
import Spinner from "~/pages/components/spinner";
import Statistic from "~/pages/components/statistic";

export default function TutorProfile() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div>Invalid Id (Not a string)</div>;
  }

  const id_ = parseInt(id);

  if (isNaN(id_)) {
    return <div>Invalid Id</div>;
  }

  const { data: details, isLoading } = api.tutor.getById.useQuery({
    id: id_,
  });

  if (!details) {
    // TODO: this will happen if cannot conenct to db, or no internet
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-5 bg-slate-100 px-10 py-5">
      {isLoading ? <Spinner /> : <Profile {...details} />}
    </div>
  );
}

type DetailProps = RouterOutputs["tutor"]["getById"];
function Profile(props: DetailProps) {
  if (!props) {
    return <Spinner />;
  }
  const {
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
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="avatar">
          <div className="w-64 rounded">
            <img src={imageUrl} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">{name}</p>
          <div className="flex flex-col">
            <Statistic
              tip={`Category: ${category}`}
              icon={<MdCategory />}
              value={category}
            />
            <Statistic
              tip={`Location: ${location}`}
              icon={<FaLocationDot />}
              value={location}
            />
            <Statistic
              tip={`School: ${school}`}
              icon={<FaSchool />}
              value={school}
            />
            <Statistic
              tip={`Achievement: ${achievement}`}
              icon={<GrCertificate />}
              value={achievement}
            />
            <Statistic
              tip={`Course: ${course}`}
              icon={<FaBook />}
              value={course}
            />
            <Statistic
              tip={`Experience: ${experience} years`}
              icon={<IoMdTime />}
              value={`${experience} years`}
            />
          </div>
          <p>
            Starting from{" "}
            <span className="text-2xl font-medium text-primary">${price}</span>
            /hour
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
