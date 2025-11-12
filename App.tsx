/*import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import StudentPage from "./components/StudentPage";
import AdminPage from "./components/AdminPage";
import type { Course, User } from "./types";
import * as api from "./api";
import * as db from "./db";

function App() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [completedVideoIds, setCompletedVideoIds] = useState<Set<string>>(new Set());
    const [currentView, setView] = useState<"student" | "admin">("student");
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const handleLinkedInLogin = () => {
        window.location.href = "/api/auth/linkedin";
    };


    // ✅ Load user session when app starts
    useEffect(() => {
        async function checkUserSession() {
            try {
                const user = await api.apiCheckSession();
                if (user) setCurrentUser(user);
            } catch (error) {
                console.error("Failed to check session", error);
            } finally {
                setIsLoading(false);
            }
        }
        checkUserSession();
    }, []);

    // ✅ Load courses when user logs in
    useEffect(() => {
        async function loadData() {
            if (!currentUser) {
                setCourses([]);
                return;
            }

            try {
                const [storedCourses, storedCompleted] = await Promise.all([
                    api.apiGetCourses(),
                    db.getCompletedVideos(),
                ]);
                setCourses(storedCourses);
                setCompletedVideoIds(new Set(storedCompleted));
            } catch (error) {
                console.error("Failed to load data", error);
            }
        }

        loadData();
    }, [currentUser]);

    // ✅ Video completion toggle
    const toggleVideoCompletion = async (id: string) => {
        const newSet = new Set(completedVideoIds);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setCompletedVideoIds(newSet);
        await db.saveCompletedVideos(Array.from(newSet));
    };

    // --- Admin placeholder API calls ---
    const addCourse = async (title: string) =>
        alert(`(Not Implemented) Add course: ${title}`);
    const deleteCourse = async (id: string) =>
        alert(`(Not Implemented) Delete course: ${id}`);
    const addVideo = async (courseId: string, title: string, description: string, file: File) =>
        alert(`(Not Implemented) Add video ${title} to course ${courseId}`);
    const deleteVideo = async (courseId: string, videoId: string) =>
        alert(`(Not Implemented) Delete video ${videoId}`);

    // --- Authentication handlers ---
    const handleSocialLogin = async (provider: "github" | "linkedin"): Promise<User> => {
        const user = await api.apiSocialLogin(provider);
        alert(`Successfully authenticated via ${provider}!`);
        setCurrentUser(user);
        return user;
    };

    const handleLogout = async () => {
        await api.apiLogout();
        localStorage.removeItem("user");
        setCurrentUser(null);
        setView("student");
    };

    const isAuthPageVisible = !currentUser && currentView === "student";

    // ✅ Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Initializing...</h1>
            </div>
        );
    }

    // ✅ Login page view (unauthenticated)
    if (isAuthPageVisible) {
        return (
            <div
                className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 text-white"
                style={{
                    backgroundImage: `url(assets/logo.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Minimal translucent header for brand }*/
              /*  <header className="absolute top-0 left-0 w-full bg-sky-900/80 py-3 shadow text-white text-lg font-semibold">
                    Design Your AI
                </header>

                <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg tracking-wide">
                    Design Your AI
                </h1>

                <button
                    onClick={handleLinkedInLogin}
                    className="bg-white text-sky-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-slate-100 transition"
                >
                    Sign in with LinkedIn
                </button>
            </div>
        );
    }

    // ✅ Authenticated view (after login)
    return (
        <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans bg-slate-50 dark:bg-slate-900">
            <Header
                currentView={currentView}
                setView={setView}
                currentUser={currentUser}
                onLogout={handleLogout}
            />

            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {currentView === "student" ? (
                    <StudentPage
                        courses={courses}
                        completedVideoIds={completedVideoIds}
                        toggleVideoCompletion={toggleVideoCompletion}
                    />
                ) : (
                    <AdminPage
                        courses={courses}
                        addCourse={addCourse}
                        deleteCourse={deleteCourse}
                        addVideo={addVideo}
                        deleteVideo={deleteVideo}
                    />
                )}
            </main>

            <footer className="text-center py-4 mt-8 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    LMS Platform © {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
}

export default App; */

import React from "react";
import FloatingAIBackground from "./components/FloatingAIBackground";

function App() {
    const handleLinkedInLogin = () => {
        window.location.href = "https://design-your-ai.vercel.app/api/auth/linkedin";
    };

    const handleGithubLogin = () => {
        alert("GitHub login coming soon!");
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-purple-100 overflow-hidden font-[Inter]">
            {/* Floating Background */}
            <FloatingAIBackground />

            {/* Header */}
            <header className="z-10 w-full bg-gradient-to-r from-cyan-400 to-indigo-900 px-8 py-4 shadow-lg flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-indigo-700 to-purple-400 rounded-xl flex items-center justify-center text-2xl">
                        🤖
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                        Design Your AI
                    </h1>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-white text-sm backdrop-blur">
                    <span role="img" aria-label="user">
                        👤
                    </span>
                    Hey, Explorer!
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col flex-1 items-center justify-center px-4 text-center relative z-10">
                <div className="bg-white/90 p-10 rounded-2xl shadow-2xl max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-4">
                        Welcome to Design Your AI
                    </h1>
                    <p className="text-lg text-slate-700 mb-6">
                        Explore a variety of courses that empower you to bring your AI ideas
                        to life and become the creator of your own intelligent innovations.
                    </p>
                    <p className="text-indigo-800 font-semibold mb-6">
                        To get you started, sign up with:
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleLinkedInLogin}
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-indigo-800 hover:from-cyan-500 hover:to-indigo-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-transform hover:-translate-y-1"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            Sign in with LinkedIn
                        </button>

                        <button
                            onClick={handleGithubLogin}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-indigo-900 hover:from-purple-500 hover:to-indigo-950 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-transform hover:-translate-y-1"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Sign in with GitHub
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;

