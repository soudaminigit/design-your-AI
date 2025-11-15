import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import StudentPage from "./components/StudentPage";
import AuthSuccess from "./components/AuthSuccess";

const Root: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                <Route path="/student" element={<StudentPage />} />
            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

