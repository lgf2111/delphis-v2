type Subject = {
    rate: number;
};

export const calcMinRate = (subjects: Subject[]) => {
    return subjects.length > 0
        ? Math.min(...subjects.map((subject) => subject.rate))
        : "-";
};
