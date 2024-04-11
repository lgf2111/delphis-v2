import { FaCaretDown } from "react-icons/fa";
import Modal from "../components/modal";
import { IoIosCloseCircle } from "react-icons/io";

interface FitlersProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

// FIXME: Same for the “Grade” button
export default function Filters(props: FitlersProps) {
  const { filters, setFilters } = props;

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

    // FIXME: When selecting the subjects, the first button is outlined & wont disappear after selecting other subjects
    return (
      <Modal
        button={
          <>
            Subject <FaCaretDown />
          </>
        }
      >
        <div className="flex flex-col gap-5">
          {subjects.map((subject, index) => (
            <Card filter={subject} key={index} />
          ))}
        </div>
      </Modal>
    );
  }
  // TODO: update location button
  function Location() {
    return (
      <Modal
        button={
          <>
            Location <FaCaretDown />
          </>
        }
        buttonClassName="btn-disabled"
        showClose
      >
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </Modal>
    );
  }
  function Grade() {
    const grades = [
      { title: "Secondary School", items: ["S1", "S2", "S3", "S4", "S5"] },
      { title: "Primary School", items: ["P1", "P2", "P3", "P4", "P5", "P6"] },
    ];
    return (
      <Modal
        button={
          <>
            Grade <FaCaretDown />
          </>
        }
      >
        <div className="flex flex-col gap-5">
          {grades.map((grade, index) => (
            <Card filter={grade} key={index} />
          ))}
        </div>
      </Modal>
    );
  }
  // TODO: update price filter
  function Others() {
    return (
      <Modal
        button={
          <>
            Others <FaCaretDown />
          </>
        }
        buttonClassName="btn-disabled"
      >
        <h3 className="text-lg font-bold">Expected Fee</h3>
      </Modal>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex gap-4 overflow-scroll">
          <Subject />
          <Location />
          <Grade />
          <Others />
        </div>
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
