import React, { useState } from "react";
import { type RouterInputs, api } from "~/utils/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

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
    onSuccess: () => {
      toast.success("Tutor created");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.subjectLevel1 = subjectLevel1;
    data.subjectLevel2 = subjectLevel2;
    data.subjectLevel3 = subjectLevel3;
    mutate(data);
  };

  const [subjectLevel1, setSubjectLevel1] = useState<string[]>([]);
  const [subjectLevel2, setSubjectLevel2] = useState<string[]>([]);
  const [subjectLevel3, setSubjectLevel3] = useState<string[]>([]);

  type InputProps = {
    label: string;
    name: keyof Inputs;
    type?: string;
    placeholder?: string;
    selected?: string[];
    setSelected?: (value: string[]) => void;
  };

  function Input({
    label,
    name,
    type = "text",
    placeholder = "",
    selected,
    setSelected,
  }: InputProps) {
    const levels = [
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "S1",
      "S2",
      "S3",
      "S4",
      "S5",
    ];

    if (type === "checkbox" && selected && setSelected) {
      const handleOnChange = (index: number) => {
        if (selected.includes(levels[index]!)) {
          setSelected(selected.filter((level) => level !== levels[index]));
        } else {
          const level = levels[index];
          if (level) {
            setSelected([...selected, level]);
          }
        }
      };

      return (
        <div className="">
          <label>{label}</label>
          <div className="grid grid-cols-6 gap-2">
            {levels.map((level, index) => (
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

    return (
      <div>
        <div className="flex flex-col">
          <label className="">{label}</label>
          <input
            {...register(name, { valueAsNumber: type === "number" })}
            id={name}
            type={type}
            className="input input-bordered w-full max-w-sm"
            placeholder={placeholder}
          />
        </div>
        {errors[name] && (
          <span className="text-red-500">{errors[name]?.message}</span>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      <Input label="Name" name="name" />
      <Input label="Image URL" name="imageUrl" />
      <Input label="Category" name="category" />
      <Input label="Qualification" name="qualification" />
      <Input label="School" name="school" />
      <Input label="Course" name="course" />
      <Input label="Experience" name="experience" type="number" />
      <Input label="Location" name="location" />
      <Input label="Introduction" name="introduction" />
      <Input label="Subject Name 1" name="subjectName1" />
      <Input
        label="Subject Level 1"
        name="subjectLevel1"
        type="checkbox"
        selected={subjectLevel1}
        setSelected={setSubjectLevel1}
      />
      <Input label="Subject Rate 1" name="subjectRate1" type="number" />
      <Input label="Subject Name 2" name="subjectName2" />
      <Input
        label="Subject Level 2"
        name="subjectLevel2"
        type="checkbox"
        selected={subjectLevel2}
        setSelected={setSubjectLevel2}
      />
      <Input label="Subject Rate 2" name="subjectRate2" type="number" />
      <Input label="Subject Name 3" name="subjectName3" />
      <Input
        label="Subject Level 3"
        name="subjectLevel3"
        type="checkbox"
        selected={subjectLevel3}
        setSelected={setSubjectLevel3}
      />
      <Input label="Subject Rate 3" name="subjectRate3" type="number" />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
