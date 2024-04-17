import { env } from "~/env";

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
    const uniqueNames = [...new Set(subjects.flatMap((subject) => subject.name))];
    return uniqueNames.join(", ");
}

export const makeAvailabilityMatrix = (availability: string[]) => {
    const dayMap = {
        MON: 0,
        TUE: 1,
        WED: 2,
        THU: 3,
        FRI: 4,
        SAT: 5,
        SUN: 6,
    }
    const matrix = Array.from({ length: 12 }, () => Array.from({ length: 7 }, () => false));
    availability.forEach((slot) => {
        const [day, time] = slot.split(":");
        // @ts-expect-error: Ignoring type error because day and time are checked above.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        matrix[parseInt(time) - 9][dayMap[day]] = true;
    });
    return matrix;
}

export const subjectList = [
    {
        title: "Primary",
        items: [
            "English",
            "Math",
            "Science",
            "Chinese",
            "Higher Chinese",
            "Tamil",
            "Malay",
            "Hindi",
        ],
    },
    {
        title: "Lower Secondary",
        items: [
            "English",
            "Math",
            "Science",
            "Chinese",
            "Higher Chinese",
            "History",
            "Geography",
            "Social Studies",
            "Literature",
            "Tamil",
            "Malay",
            "Higher Tamil",
            "Higher Malay",
            "Hindi",
        ],
    },
    {
        title: "Upper Secondary",
        items: [
            "English",
            "Chinese",
            "Higher Chinese",
            "Additional Math",
            "Elementary Math",
            "Pure Physics",
            "Pure Chemistry",
            "Pure Biology",
            "Combined Science (Physics/Chem)",
            "Combined Science (Chemistry/Biology)",
            "Combined Science (Physics/Biology)",
            "English Literature",
            "POA",
            "Pure History",
            "Pure Geography",
            "Social Studies",
            "Combined Humanities (History/SS)",
            "Combined Humanities (Geography/SS)",
            "Malay",
            "Tamil",
            "Combined Science (Physics Only)",
            "Combined Science (Chemistry Only)",
            "Combined Science (Biology Only)",
            "Combined Humanities (Geography Only)",
            "Combined Humanities (History Only)",
            "Combined Humanities (SS only)",
            "Higher Malay",
            "Higher Tamil",
            "Hindi",
            "Computing",
        ]
    },
    {
        title: "JC",
        items: [
            "General Paper",
            "H1 Chinese Language",
            "H1 Math",
            "H2 Math",
            "H1 Physics",
            "H2 Physics",
            "H1 Chemistry",
            "H2 Chemistry",
            "H1 Biology",
            "H2 Biology",
            "H1 Economics",
            "H2 Economics",
            "H1 History",
            "H2 History",
            "H1 Geography",
            "H2 Geography",
            "H3 Math",
            "H3 Physics",
            "H3 Chemistry",
            "H3 Biology",
            "H3 Economics",
            "H3 History",
            "H3 Geography",
            "H2 English Language and Linguistics",
            "H1 Literature in English",
            "H2 Literature in English",
            "H3 Literature in English",
            "H2 Knowledge & Inquiry",
            "H2 Chinese Language and Literature",
            "H1 China Studies in English",
            "H2 China Studies in English",
            "H2 China Studies in Chinese",
            "H1 General Studies in Chinese",
            "H2 Translation (Chinese)",
            "H1 Malay Language",
            "H2 Malay Language and literature",
            "H1 Tamil Language",
            "H2 Tamil Language and Literature",
            "H2 POA",
            "H2 Computing",
            "H2 Music",
            "H2 Management of Business",
            "H1 Project Work (PW)",
            "H2 Further Mathematics",
        ],
    },
];

export const levelList = [
    { title: "Primary", items: ["Primary"] },
    { title: "Secondary", items: ["Lower Secondary", "Upper Secondary"] },
    { title: "JC", items: ["JC"] },
]

export const citizenshipList = [
    "Singaporean/PR",
    "Foreigner"
]

export const genderList = [
    "Male",
    "Female",
    "Others"
]

export const raceList = [
    "Chinese",
    "Malay",
    "Indian",
    "Others"
]

export const locationList = [
    "North",
    "North West",
    "West",
    "Central",
    "North East",
    "East",
    "South",
];

export const educationList = [
    "N/O Level",
    "Polytechnic/Diploma Student",
    "Polytechnic/Diploma Graduate",
    "A-Level Student",
    "A-level Graduate",
    "Undergraduate (Private)",
    "Graduate (Private/Overseas)",
    "Undergraduate (NUS/NTU/SMU)",
    "Graduate (NUS/NTU/SMU)",
    "Masters Degree Holder",
    "PhD Holder",
]

export const categoryList = [
    "Part-Time Tutor (Diploma/Alevel)",
    "Part-Time Tutor (Undergraduate)",
    "Part-Time Tutor (Graduate)",
    "Full-Time Tutor",
    "Ex-MOE School Teacher (Primary)",
    "Ex-MOE School Teacher (Secondary)",
    "Ex-MOE School Teacher (JC)",
    "Current MOE School Teacher (Primary)",
    "Current MOE School Teacher (Secondary)",
    "Current MOE School Teacher (JC)",
    "School Teacher (Pre-School)",
    "School Teacher (Polytechnic)",
    "School Teacher (University)",
    "School Teacher (IB)",
    "School Teacher (IGCSE)",
    "Ex-School Teacher (IB)",
    "Ex-School Teacher (IGCSE)",
    "NIE Trainee (Primary & Secondary)",
    "NIE Trainee (JC)",
]

export const availabilityList = [
    "MON:09",
    "MON:10",
    "MON:11",
    "MON:12",
    "MON:13",
    "MON:14",
    "MON:15",
    "MON:16",
    "MON:17",
    "MON:18",
    "MON:19",
    "MON:20",
    "TUE:09",
    "TUE:10",
    "TUE:11",
    "TUE:12",
    "TUE:13",
    "TUE:14",
    "TUE:15",
    "TUE:16",
    "TUE:17",
    "TUE:18",
    "TUE:19",
    "TUE:20",
    "WED:09",
    "WED:10",
    "WED:11",
    "WED:12",
    "WED:13",
    "WED:14",
    "WED:15",
    "WED:16",
    "WED:17",
    "WED:18",
    "WED:19",
    "WED:20",
    "THU:09",
    "THU:10",
    "THU:11",
    "THU:12",
    "THU:13",
    "THU:14",
    "THU:15",
    "THU:16",
    "THU:17",
    "THU:18",
    "THU:19",
    "THU:20",
    "FRI:09",
    "FRI:10",
    "FRI:11",
    "FRI:12",
    "FRI:13",
    "FRI:14",
    "FRI:15",
    "FRI:16",
    "FRI:17",
    "FRI:18",
    "FRI:19",
    "FRI:20",
    "SAT:09",
    "SAT:10",
    "SAT:11",
    "SAT:12",
    "SAT:13",
    "SAT:14",
    "SAT:15",
    "SAT:16",
    "SAT:17",
    "SAT:18",
    "SAT:19",
    "SAT:20",
    "SUN:09",
    "SUN:10",
    "SUN:11",
    "SUN:12",
    "SUN:13",
    "SUN:14",
    "SUN:15",
    "SUN:16",
    "SUN:17",
    "SUN:18",
    "SUN:19",
    "SUN:20",
];

export const displayList = ["OK"];

export const timeOfDayList = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]
export const dayOfWeekList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
export const lessonCountList = [1, 2, 3, 4]
export const monthCountList = [1, 3, 6, 9, 12]

export const timeOfDayMap: Record<string, number> = {
    "9am": 9,
    "10am": 10,
    "11am": 11,
    "12pm": 12,
    "1pm": 13,
    "2pm": 14,
    "3pm": 15,
    "4pm": 16,
    "5pm": 17,
    "6pm": 18,
    "7pm": 19,
    "8pm": 20,
}
export const dayOfWeekMap: Record<string, number> = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
}

export function getKeyByValue(object: Record<string, number>, value: number) {
    return Object.keys(object).find(key => object[key] === value);
}