import { useRouter } from "next/router";
import React from "react";
import { FaLocationDot, FaSchool } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { MdCategory, MdEmail } from "react-icons/md";
import { type RouterOutputs, api, RouterInputs } from "~/utils/api";
import { formatDistance, subDays } from "date-fns";
import { GrCertificate } from "react-icons/gr";
import Spinner from "~/components/spinner";
import Statistic from "~/components/statistic";
import {
  calcMinRate,
  dayOfWeekList,
  lessonCountList,
  makeAvailabilityMatrix,
  monthCountList,
  timeOfDayList,
} from "~/utils/constants";
import Modal from "~/components/modal";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Subject } from "@prisma/client";

export default function TutorProfile() {
  const router = useRouter();
  // TODO: consider using useParam instead
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
    id,
    name,
    gender,
    race,
    postalCode,
    email,
    locations,
    education,
    category,
    school,
    gradYear,
    photo,
    availability,
    introduction,
    display,
    updatedAt,
    createdAt,
    subjects,
  } = props;

  const minRate = calcMinRate(subjects);

  const availabilityMatrix = makeAvailabilityMatrix(availability);

  function Timetable() {
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
              <th>SUN</th>
            </tr>
          </thead>
          <tbody>
            {/* body */}
            {availabilityMatrix.map((row, time) => (
              <tr key={time}>
                <td className="w-1">{time + 9}:00</td>
                {row.map((isAvailable, day) => (
                  <td
                    key={day}
                    className={`border border-2 border-gray-300 ${
                      isAvailable ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-white p-12">
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="avatar">
          <div className="w-64 rounded">
            <img src={photo ?? ""} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl">
            <b>{name}</b>
            <small className="ms-1 text-sm">(Tutor {id})</small>
          </p>
          <div className="flex flex-col">
            <Statistic
              tip={`Category: ${category}`}
              icon={<MdCategory />}
              value={category}
            />
            <Statistic
              tip={`Location: ${locations.join(", ")}`}
              icon={<FaLocationDot />}
              value={locations.join(", ")}
            />
            <Statistic
              tip={`School: ${school}`}
              icon={<FaSchool />}
              value={school}
            />
            <Statistic
              tip={`Education: ${education}`}
              icon={<GrCertificate />}
              value={education}
            />
            <Statistic
              tip={`Graduation Year: ${gradYear}`}
              icon={<IoMdTime />}
              value={gradYear}
            />
          </div>
          <p>
            Starting from{" "}
            <span className="text-2xl font-medium text-primary">
              ${minRate}
            </span>
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
      <div className="">
        <h1 className="text-lg font-bold">Availability</h1>
        {<Timetable /> ?? "This tutor has yet to provide an availability."}
      </div>
      <div className="">
        <h1 className="text-lg font-bold">Teaching Subjects</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Education Level</th>
                <th>Rate ($/h)</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const level = subject.level;

                return (
                  <tr key={index}>
                    <td>{subject.name}</td>
                    <td>{level}</td>
                    <td>{subject.rate}</td>
                    <td>
                      <BookModal
                        email={email}
                        name={name}
                        id={id}
                        subject={subject}
                        level={level}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type BookModalProps = {
  email: string;
  name: string;
  id: number;
  subject: Subject;
  level: string;
};
type BookModalInputs = RouterInputs["booking"]["bookTutor"];
function BookModal(props: BookModalProps) {
  const { name, id, email, subject, level } = props;
  const { data: session } = useSession();
  const { mutate } = api.booking.bookTutor.useMutation({});
  const { register, handleSubmit } = useForm<BookModalInputs>();

  if (!session?.user.email || !session?.user.name) {
    return (
      <button onClick={() => signIn("google")} className="btn btn-primary">
        <MdEmail />
        Book
      </button>
    );
  }

  const onSubmit: SubmitHandler<BookModalInputs> = async (data) => {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          toast.success(`Booking lesson with ${name} (Tutor ${id})`);
        },
        onError: (error) => {
          console.log(data);
          toast.error(
            `Failed to book lesson with ${name} (Tutor ${id})\n${error.message}`,
          );
        },
      },
    );
  };

  return (
    <Modal
      buttonClassName="btn btn-primary btn-sm text-white"
      button={
        <>
          <MdEmail />
          Book
        </>
      }
    >
      <h3 className="text-xl font-bold">
        Book Lesson with{" "}
        <span className="text-primary">
          {name} (Tutor {id})
        </span>
      </h3>
      <form
        className="grid gap-1 py-4 text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("email")} value={email} />
        <input
          type="hidden"
          {...register("clientEmail")}
          value={session.user.email}
        />
        <input type="hidden" {...register("subjectId")} value={subject.id} />
        <span>
          Tutor: {name} (Tutor {id})
        </span>
        <span>Subject: {subject.name}</span>
        <span>Level: {level}</span>
        <div className="">
          Postal Code:{" "}
          <input
            type="text"
            className="input input-sm input-bordered"
            {...register("postalCode", { valueAsNumber: true })}
          />
        </div>
        <div className="">
          Time of Day:{" "}
          <select
            className="select select-bordered select-sm"
            {...register("timeOfDay")}
          >
            {timeOfDayList.map((time, index) => (
              <option key={index} value={time} selected={index === 0}>
                {time}
              </option>
            ))}
          </select>{" "}
        </div>
        <div className="">
          Day of Week:{" "}
          <select
            className="select select-bordered select-sm"
            {...register("dayOfWeek")}
          >
            {dayOfWeekList.map((day, index) => (
              <option key={index} value={day} selected={index === 0}>
                {day}
              </option>
            ))}
          </select>{" "}
        </div>
        <div className="">
          Lesson:{" "}
          <select
            className="select select-bordered select-sm"
            {...register("lessonCount", {
              valueAsNumber: true,
            })}
          >
            {lessonCountList.map((lessonCount, index) => (
              <option key={index} value={lessonCount} selected={index === 0}>
                {lessonCount}
              </option>
            ))}
          </select>{" "}
          lesson(s) / month
        </div>
        <div className="">
          Duration:{" "}
          <select
            className="select select-bordered select-sm"
            {...register("monthCount", {
              valueAsNumber: true,
            })}
          >
            {monthCountList.map((monthCount, index) => (
              <option key={index} value={monthCount} selected={index === 0}>
                {monthCount}
              </option>
            ))}
          </select>{" "}
          month(s)
        </div>
        <div className="">
          Message:
          <br />
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("message")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Book Now
        </button>
      </form>
    </Modal>
  );
}
