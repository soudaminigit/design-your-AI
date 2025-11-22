import React from "react";

interface Props {
    onBack?: () => void;
    onStartLearning?: () => void;
}

const ResourcesPage: React.FC<Props> = ({ onBack, onStartLearning }) => {
    return (
        <div className="space-y-12">

            {/* HEADER SECTION */}
            <div className="rounded-2xl p-8 bg-gradient-to-r from-indigo-50 to-rose-50 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-pink-600 to-rose-600">
                    Explore Resources
                </h1>

                <p className="mt-3 text-slate-700 max-w-3xl">
                    Curated resources to help you master AI system design — including code,
                    publications, tools, and upcoming learning materials.
                </p>

                <div className="mt-6 flex gap-4">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="px-5 py-3 rounded-md bg-white shadow-md border text-indigo-700 font-semibold hover:scale-[1.02] transition"
                        >
                            ← Back to Home
                        </button>
                    )}

                    {onStartLearning && (
                        <button
                            onClick={onStartLearning}
                            className="px-5 py-3 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
                        >
                            Start Learning →
                        </button>
                    )}
                </div>
            </div>

            {/* GITHUB RESOURCES */}
            <section className="bg-white p-6 rounded-xl shadow space-y-3">
                <h2 className="text-xl font-semibold">GitHub Projects</h2>
                <p className="text-slate-700 text-sm">
                    Access hands-on AI system repositories, notebooks, and course materials.
                </p>

                <a
                    href="https://github.com/soudaminigit"
                    target="_blank"
                    className="inline-block mt-3 text-indigo-600 underline font-medium"
                >
                    Visit GitHub →
                </a>
            </section>

            {/* PUBLICATIONS */}
            <section className="bg-white p-6 rounded-xl shadow space-y-3">
                <h2 className="text-xl font-semibold">Springer Publication</h2>
                <p className="text-slate-700 text-sm">
                    Featuring research and case studies on AI system design and real-world applications.
                </p>
                <p className="text-sm text-slate-500">Releasing 2025</p>
            </section>

            {/* E-BOOK */}
            <section className="bg-white p-6 rounded-xl shadow space-y-3">
                <h2 className="text-xl font-semibold">AI Systems Design — E-Book</h2>
                <p className="text-slate-700 text-sm">
                    A practical guide for building machine learning & LLM systems end-to-end.
                </p>
                <p className="text-sm text-slate-500">Coming Soon</p>
            </section>

            {/* CORPORATE FEEDBACK */}
            <section className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl shadow space-y-4">
                <h2 className="text-xl font-semibold">Corporate Feedback</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <blockquote className="bg-white p-4 rounded-lg shadow text-sm">
                        “Practical, real-world AI training that helped our team go from models
                        to fully deployed systems.”
                        <span className="block mt-2 text-slate-500">— Corporate Client</span>
                    </blockquote>

                    <blockquote className="bg-white p-4 rounded-lg shadow text-sm">
                        “Clear, structured, and industry-aligned learning experience.”
                        <span className="block mt-2 text-slate-500">— Professional Learner</span>
                    </blockquote>

                    <blockquote className="bg-white p-4 rounded-lg shadow text-sm">
                        “High-impact training. Concepts were explained with real production use cases.”
                        <span className="block mt-2 text-slate-500">— Engineering Team</span>
                    </blockquote>
                </div>
            </section>

            {/* TOOLS & LEARNING */}
            <section className="bg-white p-6 rounded-xl shadow space-y-3">
                <h2 className="text-xl font-semibold">Recommended Tools</h2>
                <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
                    <li>VS Code</li>
                    <li>Python / Node.js</li>
                    <li>Docker & Kubernetes</li>
                    <li>MLflow for experiment tracking</li>
                    <li>Supabase / Firebase for backend workflows</li>
                    <li>HuggingFace Transformers</li>
                </ul>
            </section>

            {/* CONTACT */}
            <section className="bg-white p-6 rounded-xl shadow space-y-3">
                <h2 className="text-xl font-semibold">Contact</h2>
                <p className="text-sm text-slate-700">
                    Email: <b>admin@designyourai.in</b>
                </p>
                <p className="text-sm text-slate-700">
                    LinkedIn:{" "}
                    <a
                        href="https://www.linkedin.com/in/soudamini-sreepada-5551592a/"
                        target="_blank"
                        className="text-indigo-600 underline"
                    >
                         Soudamini Sreepada
                    </a>
                </p>
            </section>

            {/* BACK TO TOP */}
            {onBack && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={onBack}
                        className="px-5 py-3 rounded-md bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition"
                    >
                        Back to Home
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResourcesPage;
