import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const login = (userData, userToken) => {

        setUser(userData);
        setToken(userToken);

        localStorage.setItem("token", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {

        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    useEffect(() => {

        const fetchProfile = async () => {

            const savedToken = localStorage.getItem("token");

            if (!savedToken) {
                setLoading(false);
                return;
            }

            try {

                const res = await API.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                });

                setUser(res.data.user);
                setToken(savedToken);

            } catch (error) {

                logout();

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}