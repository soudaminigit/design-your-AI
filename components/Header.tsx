import React from "react";
import type { User } from "../types";
import Logo from "./Logo";

interface HeaderProps {
    currentView: "student" | "admin";
    setView: React.Dispatch<React.SetStateAction<"student" | "admin">>;
    currentUser: User | null;
    onLogout: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, currentUser, onLogout }) => {
    return (
        <header className="w-full bg-sky-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView("student")}>
                    <Logo className="w-10 h-10 object-contain rounded-md" />
                    <h1 className="text-lg font-semibold">Design Your AI</h1>
                </div>

                {/* Navigation toggle */}
                <nav className="hidden sm:flex gap-4">
                    <button
                        onClick={() => setView("student")}
                        className={`text-sm font-medium ${currentView === "student" ? "underline" : ""
                            }`}
                    >
                        Student
                    </button>
                    <button
                        onClick={() => setView("admin")}
                        className={`text-sm font-medium ${currentView === "admin" ? "underline" : ""
                            }`}
                    >
                        Admin
                    </button>
                </nav>
            </div>

            {/* User info and logout */}
            <div className="flex items-center gap-4">
                {currentUser && (
                    <span className="text-sm">
                        Welcome, <span className="font-semibold">{currentUser.name}</span>
                    </span>
                )}
                {currentUser && (
                    <button
                        onClick={onLogout}
                        className="bg-white text-sky-600 font-semibold text-sm px-3 py-1 rounded hover:bg-slate-100 transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
