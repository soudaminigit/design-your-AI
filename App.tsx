import React, { useEffect, useState, useCallback } from "react";
import FloatingAIBackground from "./components/FloatingAIBackground";
import StudentPage from "./components/StudentPage";
import type { Course, Lesson } from "./types";
import "./index.css";

import Header from "./components/Header";
import HomePage from "./HomePage";
import ResourcesPage from "./components/ResourcesPage";

interface User {
    name: string;
    email: string;
}

type View = "home" | "auth" | "student" | "resources";

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [view, setView] = useState<View>("home");

    // When LinkedIn redirects with ?name=..&email=..
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get("name");
        const email = params.get("email");

        if (name && email) {
            const newUser = { name, email };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));

            window.history.replaceState({}, document.title, "/");
            setView("student");
            return;
        }

        // Restore session
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
            setView("student");
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("user");
        setUser(null);
        setView("home");
    }, []);

    const handleLinkedInLogin = () => {
        window.location.href = "/api/auth/linkedin";
    };

    const handleGithubLogin = () => {
        alert("GitHub login coming soon!");
    };

    // =============================
    // VIEW: HOME (Landing page)
    // =============================
    if (!user && view === "home") {
        return (
            <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <FloatingAIBackground />

                <Header
                    currentView={view}
                    setView={setView}
                    currentUser={user}
                    onLogout={handleLogout}
                />

                <main className="px-6 py-10 max-w-6xl mx-auto relative z-10">
                    <HomePage
                        onGetStarted={() => setView("auth")}
                        onExploreResources={() => setView("resources")}
                    />
                </main>
            </div>
        );
    }

    // =============================
    // VIEW: AUTH (LinkedIn login)
    // =============================
    if (!user && view === "auth") {
        return (
            <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-purple-100 overflow-hidden font-[Inter]">
                <FloatingAIBackground />

                <Header
                    currentView={view}
                    setView={setView}
                    currentUser={user}
                    onLogout={handleLogout}
                />

                <main className="flex flex-col flex-1 items-center justify-center px-4 text-center relative z-10">
                    <div className="bg-white/90 p-10 rounded-2xl shadow-2xl max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-4">
                            Register / Login
                        </h1>

                        <p className="text-lg text-slate-700 mb-6">
                            Sign in to access the AI course platform.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={handleLinkedInLogin}
                                className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-indigo-800 
                                hover:from-cyan-500 hover:to-indigo-900 text-white px-6 py-3 rounded-lg font-semibold 
                                shadow-md transition-transform hover:-translate-y-1"
                            >
                                Sign in with LinkedIn
                            </button>

                            <button
                                onClick={handleGithubLogin}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-indigo-900 
                                hover:from-purple-500 hover:to-purple-950 text-white px-6 py-3 rounded-lg font-semibold 
                                shadow-md transition-transform hover:-translate-y-1"
                            >
                                Sign in with GitHub
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // =============================
    // VIEW: RESOURCES PAGE
    // =============================
    if (view === "resources" && !user) {
        return (
            <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <FloatingAIBackground />

                <Header
                    currentView={view}
                    setView={setView}
                    currentUser={user}
                    onLogout={handleLogout}
                />

                <main className="px-6 py-10 max-w-6xl mx-auto relative z-10">
                    <ResourcesPage
                        onBack={() => setView("home")}
                        onStartLearning={() => setView("auth")}
                    />
                </main>
            </div>
        );
    }

    // =============================
    // VIEW: STUDENT (After login)
    // =============================
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-[Inter]">
            <Header
                currentView={view}
                setView={setView}
                currentUser={user}
                onLogout={handleLogout}
            />

            <main className="flex-1 p-8">
                <StudentPage
                    onCourseSelect={(courseId: string) =>
                        console.log("Course selected:", courseId)
                    }
                    onLessonSelect={(lessonId: string) =>
                        console.log("Lesson selected:", lessonId)
                    }
                    onLessonComplete={(lessonId: string, completed: boolean) =>
                        console.log(
                            `Lesson ${lessonId} marked as ${completed ? "completed" : "incomplete"
                            }`
                        )
                    }
                />
            </main>
        </div>
    );
}
