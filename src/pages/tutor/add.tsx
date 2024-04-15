import React, { useState } from "react";
import { type RouterInputs, api } from "~/utils/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";
import { availabilityList, displayList, locationList } from "~/utils/tutor";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.locations = locations;
    data.availability = availability;
    data.display = !!display;

    mutate(data);
  };
  const [locations, setLocations] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [display, setDisplay] = useState<string[]>([]);

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
      (type === "checkbox" || type === "availability") &&
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
            {...register(name, { valueAsNumber: true })}
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
        {errors[name] && (
          <span className="text-red-500">{errors[name]?.message}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="grid w-3/4 gap-3">
        <h1 className="text-3xl font-bold">Add Tutor Form</h1>
        <Input label="Name" name="name" />
        <Input label="Citizenship" name="citizenship" />
        <Input label="Date of Birth" name="dob" type="date" />
        <Input label="Gender" name="gender" />
        <Input label="Race" name="race" />
        <Input label="Postal Code" name="postalCode" />
        <Input label="Email" name="email" />
        <Input
          label="Locations"
          name="locations"
          type="checkbox"
          items={locationList}
          selected={locations}
          setSelected={setLocations}
        />
        <Input label="Education" name="education" />
        <Input label="Category" name="category" />
        <Input label="School" name="school" />
        <Input label="Graduation Year" name="gradYear" type="number" />
        <Input label="Photo" name="photo" />
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
