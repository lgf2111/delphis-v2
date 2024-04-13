type Subject = {
    rate: number;
    name: string;
};

export const calcMinRate = (subjects: Subject[]) => {
    return subjects.length > 0
        ? Math.min(...subjects.map((subject) => subject.rate))
        : "-";
};

export const makeSubjectNames = (subjects: Subject[]) => {
    return subjects.map((subject) => subject.name).join(", ");
}

export const subjects = [
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

export const levels = [
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