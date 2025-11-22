import React from "react";
import Logo from "./Logo";

interface HeaderProps {
    currentView: string;
    setView: React.Dispatch<React.SetStateAction<"home" | "auth" | "student" | "resources">>;
    currentUser: any;
    onLogout: () => void;
}


const Header: React.FC<HeaderProps> = ({
    currentView,
    setView,
    currentUser,
    onLogout,
}) => {
    return (
        <header className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-pink-600 to-rose-500 text-white shadow-lg">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

                {/* LOGO + TITLE */}
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setView("home")}
                >
                    <Logo className="w-10 h-10 rounded-md shadow-sm object-contain" />
                    <div>
                        <div className="text-lg font-bold">Design Your AI</div>
                        <div className="text-xs opacity-90">Build AI systems end-to-end</div>
                    </div>
                </div>

                {/* NAVIGATION */}
                <nav className="flex items-center gap-6 text-sm font-medium">

                    <button
                        onClick={() => setView("home")}
                        className="hover:underline"
                    >
                        Home
                    </button>

                    <button
                        onClick={() => setView("student")}
                        className="hover:underline"
                    >
                        Courses
                    </button>

                    <button
                        onClick={() => setView("resources")}
                        className="hover:underline"
                    >
                        Resources
                    </button>

                    {/* LOGIN / LOGOUT */}
                    {!currentUser ? (
                        <button
                            onClick={() => setView("auth")}
                            className="ml-4 bg-white/20 px-3 py-1 rounded-md hover:bg-white/30 transition"
                        >
                            Register / Login
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-sm">Hi, {currentUser.name}</span>
                            <button
                                onClick={onLogout}
                                className="bg-white text-indigo-600 px-3 py-1 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
