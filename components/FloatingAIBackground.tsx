import React from "react";

const FloatingAIBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Neural Nodes */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-300 animate-pulse" style={{ top: "15%", left: "25%" }}></div>
                <div className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-300 animate-pulse" style={{ top: "25%", left: "70%", animationDelay: "1s" }}></div>
                <div className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-300 animate-pulse" style={{ top: "45%", left: "15%", animationDelay: "2s" }}></div>
                <div className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-lg shadow-indigo-300 animate-pulse" style={{ top: "55%", left: "85%", animationDelay: "0.5s" }}></div>
            </div>

            {/* Floating SVG Shapes */}
            <svg
                className="absolute animate-[float_20s_ease-in-out_infinite] opacity-40"
                width="200"
                height="200"
                style={{ top: "10%", left: "10%" }}
                viewBox="0 0 200 200"
            >
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4dd0e1" />
                        <stop offset="100%" stopColor="#1a237e" />
                    </linearGradient>
                </defs>
                <path
                    d="M20,50 L80,50 L80,100 L140,100"
                    stroke="url(#grad1)"
                    strokeWidth="3"
                    fill="none"
                />
                <circle cx="80" cy="100" r="6" fill="#4dd0e1" />
            </svg>

            <svg
                className="absolute animate-[float_22s_ease-in-out_infinite] opacity-40"
                width="180"
                height="180"
                style={{ top: "60%", left: "75%", animationDelay: "3s" }}
                viewBox="0 0 180 180"
            >
                <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ba68c8" />
                        <stop offset="100%" stopColor="#4dd0e1" />
                    </linearGradient>
                </defs>
                <circle cx="90" cy="85" r="50" stroke="url(#grad2)" strokeWidth="3" fill="none" />
                <circle cx="90" cy="85" r="8" fill="#4dd0e1" />
            </svg>

            <svg
                className="absolute animate-[float_18s_ease-in-out_infinite] opacity-40"
                width="150"
                height="150"
                style={{ top: "25%", right: "12%", animationDelay: "6s" }}
                viewBox="0 0 150 150"
            >
                <defs>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4dd0e1" />
                        <stop offset="100%" stopColor="#ba68c8" />
                    </linearGradient>
                </defs>
                <text x="15" y="40" fontFamily="monospace" fontSize="16" fill="url(#grad3)">
                    101010
                </text>
                <text x="25" y="80" fontFamily="monospace" fontSize="16" fill="url(#grad3)">
                    110011
                </text>
            </svg>
        </div>
    );
};

export default FloatingAIBackground;
