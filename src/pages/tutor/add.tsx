import React, { useState } from "react";
import { type RouterInputs, api } from "~/utils/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";
import {
  availabilityList,
  categoryList,
  citizenshipList,
  displayList,
  educationList,
  genderList,
  locationList,
  raceList,
  subjectList,
} from "~/utils/constants";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: `/?error=${encodeURI("You are not admin!")}`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default function AddTutor() {
  return (
    <div className="p-10">
      <AddTutorForm />
    </div>
  );
}

type Inputs = RouterInputs["tutor"]["create"] & {
  imageUrl: string;
  course: string;
};

const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function AddTutorForm() {
  const { mutate } = api.tutor.create.useMutation({
    onSuccess: (data) => {
      toast.success(`Tutor ${data.name} created`);
      reset();
      setLocations([]);
      setAvailability([]);
      setDisplay([]);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const photo: File = data.photo?.[0];
    if (!photo) {
      toast.error("Please upload a photo");
      return;
    }
    data.photo = await convertToBase64(photo);
    data.locations = locations;
    data.availability = availability;
    data.display = !!display;
    data.subjects1 = subject1;
    data.subjects2 = subject2;
    data.subjects3 = subject3;
    data.subjects4 = subject4;

    mutate(data);
  };
  const [locations, setLocations] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [display, setDisplay] = useState<string[]>([]);
  const [subject1, setSubject1] = useState<string[]>([]);
  const [subject2, setSubject2] = useState<string[]>([]);
  const [subject3, setSubject3] = useState<string[]>([]);
  const [subject4, setSubject4] = useState<string[]>([]);

  type InputProps = {
    label: string;
    name: keyof Inputs;
    type?: string;
    placeholder?: string;
    items?: string[];
    selected?: string[];
    setSelected?: (value: string[]) => void;
  };

  function Input({
    label,
    name,
    type = "text",
    placeholder = "",
    items = [],
    selected,
    setSelected,
  }: InputProps) {
    if (
      ["checkbox", "availability"].includes(type) &&
      selected &&
      setSelected
    ) {
      const handleOnChange = (index: number) => {
        if (selected.includes(items[index]!)) {
          setSelected(selected.filter((item) => item !== items[index]));
        } else {
          const item = items[index];
          if (item) {
            setSelected([...selected, item]);
          }
        }
      };

      return (
        <div className="">
          <label>{label}</label>
          <div
            className={`gap-x-5 gap-y-2 ${type === "checkbox" ? "flex flex-wrap" : "grid grid-flow-col grid-rows-12"}`}
          >
            {items.map((level, index) => (
              <div key={index} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={level}
                  checked={selected.includes(level)}
                  onChange={() => handleOnChange(index)}
                  className="checkbox"
                />
                <label>{level}</label>
              </div>
            ))}
          </div>
        </div>
      );
    }

    function input(type: string) {
      if (type === "date") {
        return (
          <input
            {...register(name, { valueAsDate: true })}
            id={name}
            type={type}
            className="input input-bordered"
            placeholder={placeholder}
          />
        );
      }

      if (type === "number") {
        return (
          <input
            {...register(name, { valueAsNumber: true, value: 0 })}
            id={name}
            type={type}
            className="input input-bordered"
            placeholder={placeholder}
          />
        );
      }

      if (type === "textarea") {
        return (
          <textarea
            {...register(name)}
            id={name}
            className="textarea textarea-bordered"
            placeholder={placeholder}
          />
        );
      }

      if (type === "file") {
        return (
          <input
            {...register(name)}
            id={name}
            type={type}
            className="file-input file-input-bordered"
            placeholder={placeholder}
          />
        );
      }

      if (type === "select") {
        return (
          <select
            {...register(name)}
            id={name}
            className="select select-bordered"
          >
            {items.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        );
      }

      return (
        <input
          {...register(name)}
          id={name}
          type={type}
          className="input input-bordered"
          placeholder={placeholder}
        />
      );
    }

    return (
      <div>
        <div className="flex flex-col">
          <label className="">{label}</label>
          {input(type)}
        </div>
        {/* {errors[name] && (
          <span className="text-red-500">{errors[name]?.message}</span>
        )} */}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="grid w-3/4 gap-3">
        <h1 className="text-3xl font-bold">Add Tutor Form</h1>
        <Input label="Name" name="name" />
        <Input
          label="Citizenship"
          name="citizenship"
          type="select"
          items={citizenshipList}
        />
        <Input label="Date of Birth" name="dob" type="date" />
        <Input label="Gender" name="gender" type="select" items={genderList} />
        <Input label="Race" name="race" type="select" items={raceList} />
        <Input label="Postal Code" name="postalCode" />
        <Input label="Email" name="email" />
        <Input
          label="Primary Subjects"
          name="subjects1"
          type="checkbox"
          items={subjectList[0]?.items}
          selected={subject1}
          setSelected={setSubject1}
        />
        <Input label="Primary Rate" name="rate1" type="number" />
        <Input
          label="Lower Secondary Subjects"
          name="subjects2"
          type="checkbox"
          items={subjectList[1]?.items}
          selected={subject2}
          setSelected={setSubject2}
        />
        <Input label="Lower Secondary Rate" name="rate2" type="number" />
        <Input
          label="Upper Secondary Subjects"
          name="subjects3"
          type="checkbox"
          items={subjectList[2]?.items}
          selected={subject3}
          setSelected={setSubject3}
        />
        <Input label="Upper Secondary Rate" name="rate3" type="number" />
        <Input
          label="JC Subjects"
          name="subjects4"
          type="checkbox"
          items={subjectList[3]?.items}
          selected={subject4}
          setSelected={setSubject4}
        />
        <Input label="JC Rate" name="rate4" type="number" />
        <Input
          label="Locations"
          name="locations"
          type="checkbox"
          items={locationList}
          selected={locations}
          setSelected={setLocations}
        />
        <Input
          label="Education"
          name="education"
          type="select"
          items={educationList}
        />
        <Input
          label="Category"
          name="category"
          type="select"
          items={categoryList}
        />
        <Input label="School" name="school" />
        <Input label="Graduation Year" name="gradYear" type="number" />
        <Input label="Photo" name="photo" type="file" />
        <Input
          label="Availability"
          name="availability"
          type="availability"
          items={availabilityList}
          selected={availability}
          setSelected={setAvailability}
        />
        <Input label="Introduction" name="introduction" type="textarea" />
        <Input
          label="Display"
          name="display"
          type="checkbox"
          items={displayList}
          selected={display}
          setSelected={setDisplay}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
