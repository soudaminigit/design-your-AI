import React from "react";
import logo from "../assets/logo.png"; // ✅ Vite will resolve & bundle this

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <img
            src={logo}
            alt="Logo"
            className={className}
            style={{ objectFit: "contain" }}
        />
    );
};

export default Logo;
