import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import StudentPage from "./components/StudentPage";
import AuthSuccess from "./components/AuthSuccess";

// 🧩 Mock Data (you can later replace with data fetched from API or state)
const mockCourses = [
    {
        id: "course1",
        title: "Introduction to AI",
        videos: [
            { id: "v1", title: "What is AI?", description: "Understanding AI concepts", url: "https://example.com/video1.mp4" },
            { id: "v2", title: "Machine Learning Basics", description: "Supervised and unsupervised learning", url: "https://example.com/video2.mp4" },
        ],
    },
    {
        id: "course2",
        title: "Deep Learning Fundamentals",
        videos: [
            { id: "v3", title: "Neural Networks 101", description: "How neural networks learn", url: "https://example.com/video3.mp4" },
        ],
    },
];

// ✅ Simple helper functions
const toggleVideoCompletion = (id: string, set: Set<string>, setSetter: (s: Set<string>) => void) => {
    const updated = new Set(set);
    if (updated.has(id)) {
        updated.delete(id);
    } else {
        updated.add(id);
    }
    setSetter(updated);
};

const Root: React.FC = () => {
    const [completedVideos, setCompletedVideos] = React.useState<Set<string>>(new Set());

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route
                    path="/auth-success"
                    element={<AuthSuccess />}
                />
                <Route
                    path="/student"
                    element={
                        <StudentPage
                            courses={mockCourses}
                            completedVideoIds={completedVideos}
                            toggleVideoCompletion={(id) => toggleVideoCompletion(id, completedVideos, setCompletedVideos)}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/student" element={<StudentPage courses={[]}
                    completedVideoIds={new Set()}
                    toggleVideoCompletion={() => { }} />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

