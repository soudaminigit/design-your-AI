import React, { useState, useEffect } from "react";
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
        window.location.href = "http://localhost:3000/auth/linkedin";
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
                {/* Minimal translucent header for brand */}
                <header className="absolute top-0 left-0 w-full bg-sky-900/80 py-3 shadow text-white text-lg font-semibold">
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

export default App;
