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