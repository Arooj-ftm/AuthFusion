import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import StatCard from "../../components/StatCard/StatCard";

import API from "../../services/authService";

import {
    FaShieldAlt,
    FaDatabase,
    FaLock,
    FaCheckCircle,
} from "react-icons/fa";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data.user);
            } catch (err) {
                logout();
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="dashboard">

            <Navbar
                user={user}
                onLogout={logout}
            />

            <div className="dashboard-container">

                <div className="left-side">

                    <ProfileCard user={user} />

                </div>

                <div className="right-side">

                    <div className="welcome-box">

                        <h1>
                            Welcome Back,
                            <span> {user?.name || "User"} 👋</span>
                        </h1>

                        <p>
                            Your authentication system is active and secure.
                        </p>

                    </div>

                    <div className="stats-grid">

                        <StatCard
                            icon={<FaShieldAlt />}
                            title="JWT Security"
                            value="Protected"
                        />

                        <StatCard
                            icon={<FaDatabase />}
                            title="Database"
                            value="MongoDB Atlas"
                        />

                        <StatCard
                            icon={<FaLock />}
                            title="Authentication"
                            value="Verified"
                        />

                    </div>

                    <div className="activity-card">

                        <h2>Recent Activity</h2>

                        <ul>

                            <li>
                                <FaCheckCircle />
                                Login Successful
                            </li>

                            <li>
                                <FaCheckCircle />
                                JWT Token Verified
                            </li>

                            <li>
                                <FaCheckCircle />
                                Protected Route Accessed
                            </li>

                            <li>
                                <FaCheckCircle />
                                Secure Session Active
                            </li>

                        </ul>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;