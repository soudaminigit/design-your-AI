import React from "react";
import FloatingAIBackground from "./components/FloatingAIBackground";
import './index.css';

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
            {/* Contact Us Section */}
            <section className="mt-16 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-2xl w-full">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Contact Us</h2>
                <p className="text-slate-700 mb-6">
                    Have questions or feedback? Drop us a quick message and we'll get back to you soon!
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Thank you for reaching out! We’ll respond shortly.");
                    }}
                    className="space-y-4"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        rows={4}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-400 to-indigo-700 hover:from-cyan-500 hover:to-indigo-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-transform hover:-translate-y-1"
                    >
                        Send Message
                    </button>
                </form>
            </section>

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

