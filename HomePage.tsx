import React from "react";

interface HomeProps {
    onGetStarted?: () => void;
    onExploreResources?: () => void;
}


const HomePage: React.FC<HomeProps> = ({ onGetStarted, onExploreResources }) => {
    return (
        <section className="space-y-12">

            {/* HERO SECTION */}
            <div className="rounded-2xl p-10 bg-gradient-to-r from-indigo-50 to-rose-50 shadow-xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-pink-600 to-rose-600">
                    Build AI Systems End-to-End
                </h1>

                <p className="mt-4 text-slate-700 max-w-2xl">
                    Learn how to design, build, and deploy production-quality AI systems with real-world
                    guidance from an AI Architect, Trainer, and upcoming Springer Author.
                </p>

                <div className="mt-6 flex gap-4">
                    <button
                        onClick={onGetStarted}
                        className="px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={onExploreResources}
                        className="px-5 py-3 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
                    >
                        Explore Resources
                    </button>

                </div>
            </div>

            {/* MISSION + FOUNDER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                    <p className="mt-3 text-slate-700 leading-relaxed">
                        AI education today focuses heavily on tools. But real AI engineering
                        requires systems thinking — data pipelines, model design, deployment,
                        orchestration, and monitoring.
                        This platform empowers learners to build complete AI systems, end-to-end.
                    </p>

                    <h4 className="mt-6 font-semibold">About the Founder</h4>
                    <p className="mt-2 text-slate-700 leading-relaxed">
                        Soudamini S is an AI Architect, Corporate Trainer, and Mentor.
                        She has trained thousands of professionals across companies and is
                        currently authoring an AI Systems Design book and contributing to
                        Springer Publications.
                    </p>
                </div>

                <aside className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h4 className="font-semibold">Quick Links</h4>
                    <ul className="text-sm space-y-2 text-slate-700">
                        <li>
                            <a className="text-indigo-600 underline" href="https://github.com/soudaminigit" target="_blank">GitHub</a>
                        </li>
                        <li>
                            <a className="text-indigo-600 underline" href="#" target="_blank">Springer Publication</a>
                        </li>
                        <li>
                            <a className="text-indigo-600 underline" href="#" target="_blank">Topmate Reviews</a>
                        </li>
                    </ul>
                </aside>
            </div>

            {/* TESTIMONIALS */}
            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6">What Professionals Say</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <blockquote className="bg-white p-4 rounded-lg shadow">
                        “Practical, real-world AI training that helped our team go from models to production.”
                        <span className="block mt-2 text-sm text-slate-500">— Corporate Feedback</span>
                    </blockquote>

                    <blockquote className="bg-white p-4 rounded-lg shadow">
                        “Clear, deep and industry-ready explanations.”
                        <span className="block mt-2 text-sm text-slate-500">— Topmate Review</span>
                    </blockquote>

                    <blockquote className="bg-white p-4 rounded-lg shadow">
                        “One of the best mentors for applied AI engineering.”
                        <span className="block mt-2 text-sm text-slate-500">— Preplaced Student</span>
                    </blockquote>
                </div>
            </div>

            {/* RESOURCES */}
            <div id="resources" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-sm mt-2 text-slate-700">
                        Explore code samples, notebooks, and AI system repos.
                    </p>
                    <a
                        href="https://github.com/soudaminigit"
                        target="_blank"
                        className="text-indigo-600 underline mt-3 inline-block"
                    >
                        Visit GitHub
                    </a>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h4 className="font-semibold">E-book (Coming Soon)</h4>
                    <p className="text-sm mt-2 text-slate-700">
                        Your guide to designing production-ready AI systems.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h4 className="font-semibold">Springer Publication</h4>
                    <p className="text-sm mt-2 text-slate-700">
                        Academic and applied AI engineering content (2025).
                    </p>
                </div>
            </div>

            {/* CONTACT */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold">Contact</h3>
                <p className="mt-2 text-sm text-slate-700">Email: admin@designyourai.in</p>
                <p className="mt-1 text-sm text-slate-700">
                    LinkedIn:{" "}
                    <a
                        href="https://linkedin.com/in/soudamini"
                        target="_blank"
                        className="text-indigo-600 underline"
                    >
                        Soudamini
                    </a>
                </p>
            </div>
        </section>
    );
};

export default HomePage;
