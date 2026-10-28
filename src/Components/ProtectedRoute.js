import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const verifyAdmin = async () => {

            const token = sessionStorage.getItem("adminToken");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
                    {
                        method: "GET",

                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.ok) {
                    setAuthenticated(true);
                } else {
                    sessionStorage.removeItem("adminToken");
                }

            } catch (error) {

                console.log("Authentication error:", error);

            } finally {

                setLoading(false);

            }
        };

        verifyAdmin();

    }, []);

    if (loading) {
        return <div>Checking authentication...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/admin" replace />;
    }

    return children;
};