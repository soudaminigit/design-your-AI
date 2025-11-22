import React from "react";

interface CoursePageProps {
    onBack?: () => void;
    onStartLearning?: () => void;
}

const CoursePage: React.FC<CoursePageProps> = ({ onBack, onStartLearning }) => {
    return (
        <div className="space-y-12">

            {/* Header Section */}
            <div className="rounded-2xl p-8 bg-gradient-to-r from-indigo-50 to-rose-50 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-pink-600 to-rose-600">
                    Courses Catalog
                </h1>

                <p className="mt-3 text-slate-700 max-w-3xl">
                    Explore the courses designed to help you build AI systems end-to-end.
                    Each course combines theory, system design, and hands-on projects.
                </p>

                {onBack && (
                    <button
                        onClick={onBack}
                        className="mt-6 px-5 py-3 rounded-md bg-white shadow-md border text-indigo-700 font-semibold hover:scale-[1.02] transition"
                    >
                        ← Back to Home
                    </button>
                )}
            </div>

            {/* Course Catalog */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course 1 */}
                <div className="bg-white p-6 rounded-xl shadow space-y-3">
                    <h2 className="text-xl font-semibold text-indigo-700">Full Stack System Design</h2>
                    <p className="text-sm text-slate-700">
                        Learn Databases, services and design guidelines.
                    </p>
                    <ul className="list-disc pl-6 text-sm text-slate-600">
                        <li>RDBMS Design</li>
                        <li>Choosing the right databases</li>
                        <li>Monolithic vs Microservices</li>
                        <li>Micro-service Architecture and Design Patterns</li>
                        <li>Building an Application End to End</li>
                    </ul>
                </div>


                {/* Course 2 */}
                <div className="bg-white p-6 rounded-xl shadow space-y-3">
                    <h2 className="text-xl font-semibold text-indigo-700">Machine Learning System Design</h2>
                    <p className="text-sm text-slate-700">
                        Learn supervised & unsupervised learning, model evaluation, deployment and ML system thinking.
                    </p>
                    <ul className="list-disc pl-6 text-sm text-slate-600">
                        <li>Python & Scikit-Learn</li>
                        <li>Real datasets</li>
                        <li>End-to-end ML workflow</li>
                        <li>Deploying ML models</li>
                    </ul>
                </div>

                {/* Course 3 */}
                <div className="bg-white p-6 rounded-xl shadow space-y-3">
                    <h2 className="text-xl font-semibold text-indigo-700">Deep Learning System Design</h2>
                    <p className="text-sm text-slate-700">
                        Master neural networks, Computer Vision, CNNs, NLP, LSTMs.
                    </p>
                    <ul className="list-disc pl-6 text-sm text-slate-600">
                        <li>Neural Networks</li>
                        <li>Convolution Models</li>
                        <li>Transfer Learning</li>
                        <li>Pytorch / TensorFlow</li>
                    </ul>
                </div>

                {/* Course 4 */}
                <div className="bg-white p-6 rounded-xl shadow space-y-3">
                    <h2 className="text-xl font-semibold text-indigo-700">System Design using LLMs & Transformers</h2>
                    <p className="text-sm text-slate-700">
                        Learn transformers, Prompting, LLM finetuning, and LLM system design.
                    </p>
                    <ul className="list-disc pl-6 text-sm text-slate-600">
                        <li>Transformer architecture</li>
                        <li>Fine-tuning techniques</li>
                        <li> Prompting techniques</li>
                        <li>PEFT / LoRA / RAG</li>
                        <li>Building LLM apps</li>
                    </ul>
                </div>
                {/* Course 5 */}
                <div className="bg-white p-6 rounded-xl shadow space-y-3">
                    <h2 className="text-xl font-semibold text-indigo-700">Data Analysis and Pipelines</h2>
                    <p className="text-sm text-slate-700">
                        Database design, Data Analysis.
                    </p>
                    <ul className="list-disc pl-6 text-sm text-slate-600">
                        <li>RDBMS Design</li>
                        <li>Choosing the right databases</li>
                        <li>Data Analysis and Data quality</li>
                        <li>Handson EDA</li>
                    </ul>
                </div>
                {/* Course 6 */}
                <div className="bg-white p-6 rounded-xl shadow space-y-3">
                    <h2 className="text-xl font-semibold text-indigo-700">MLOps</h2>
                    <p className="text-sm text-slate-700">
                        Basic supervised/unsupervised Learning, FastAPI, Docker, Kubernetes.
                    </p>
                    <ul className="list-disc pl-6 text-sm text-slate-600">
                        <li>Supervised/Unsupervised Algorithms</li>
                        <li>Fast API</li>
                        <li>Docker</li>
                        <li> Kubernetes</li>
                        <li>Deploying End to End</li>
                    </ul>
                </div>

                
                {/* Course 7 */}
                <div className="bg-white p-6 rounded-xl shadow space-y-3">
                    <h2 className="text-xl font-semibold text-indigo-700">Prompting and Agents</h2>
                    <p className="text-sm text-slate-700">
                        LLMs, Prompt Engineering, Agent Frameworks.
                    </p>
                    <ul className="list-disc pl-6 text-sm text-slate-600">
                        <li>LLM Architectures</li>
                        <li>Prompt Engineering</li>
                        <li>Multi-agent Frameworks</li>
                        <li>Build Agent Framework End to End</li>
                    </ul>
                </div>

            </div>

            {/* Call to Action */}
            {onStartLearning && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={onStartLearning}
                        className="px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
                    >
                        Start Learning →
                    </button>
                </div>
            )}
        </div>
    );
};

export default CoursePage;
