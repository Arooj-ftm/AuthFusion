import "./Dashboard.css";

import Navbar from "../../components/Navbar/Navbar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import StatCard from "../../components/StatCard/StatCard";
import { useAuth } from "../../context/AuthContext";

import {
    FaShieldAlt,
    FaDatabase,
    FaLock,
    FaCheckCircle,
} from "react-icons/fa";

function Dashboard() {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loader"></div>
            </div>
        );
    }


    if (!user) {
        return (
            <div className="empty-state">
                <div className="empty-box">
                    <h2>No Profile Found</h2>
                    <p>Please login to continue.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">

            <Navbar />

            <div className="dashboard-container">

                <div className="left-side">

                    <ProfileCard />
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