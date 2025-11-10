import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AuthSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const name = searchParams.get("name");
        const email = searchParams.get("email");
        if (name && email) {
            setUser({ name, email });
            localStorage.setItem("user", JSON.stringify({ name, email }));
        }
    }, [searchParams]);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            {user ? (
                <>
                    <h2>Welcome, {user.name}!</h2>
                    <p>{user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AuthSuccess;
