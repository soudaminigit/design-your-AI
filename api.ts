// Fully regenerated api.ts
// Matches your Lesson + Course interfaces exactly as defined in types.ts

import type { User, Course } from "./types";

const API_BASE_URL = "/api";

// Mock in-memory user DB
let mockUserDatabase: User[] = [];

// ⭐ Fully corrected mock course database
const mockCourseDatabase: Course[] = [
    {
        id: "course-1",
        title: "Introduction to AI",
        description: "Basics of Artificial Intelligence",
        category: "AI",
        lessons: [
            {
                id: "lesson-1",
                title: "What is AI?",
                description: "A brief overview.",
                video:
                    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                notebook: "",
                assessment: "",
            },
        ],
    },
    {
        id: "course-2",
        title: "Advanced React Patterns",
        description: "Learn advanced React concepts",
        category: "Frontend",
        lessons: [
            {
                id: "lesson-2",
                title: "Understanding React Hooks",
                description: "Deep dive into hooks.",
                video:
                    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                notebook: "",
                assessment: "",
            },
        ],
    },
];

// Utility: simulate delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ------------------------------------------------------------
// AUTH MOCK API
// ------------------------------------------------------------

export const apiSocialLogin = async (
    provider: "github" | "linkedin"
): Promise<User> => {
    console.log(`[API MOCK] Simulating login with ${provider}...`);
    await delay(600);

    const email =
        provider === "github"
            ? "social.user@github.com"
            : "social.user@linkedin.com";

    const name = provider === "github" ? "GitHub User" : "LinkedIn User";

    let user = mockUserDatabase.find((u) => u.email === email);

    if (!user) {
        user = {
            id: `user-${Date.now()}`,
            name,
            email,
            provider,
        };
        mockUserDatabase.push(user);
    }

    sessionStorage.setItem("currentUser", JSON.stringify(user));
    return user;
};

export const apiCheckSession = async (): Promise<User | null> => {
    await delay(300);
    const saved = sessionStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
};

export const apiLogout = async (): Promise<void> => {
    await delay(200);
    sessionStorage.removeItem("currentUser");
};

// ------------------------------------------------------------
// COURSES MOCK API
// ------------------------------------------------------------

export const apiGetCourses = async (): Promise<Course[]> => {
    console.log("[API MOCK] Fetching courses...");
    await delay(700);

    // return deep cloned structure (avoid mutation side effects)
    return JSON.parse(JSON.stringify(mockCourseDatabase));
};
