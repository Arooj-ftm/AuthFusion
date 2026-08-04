import "./Navbar.css";
import { FaShieldAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <nav className="navbar">

            <div className="logo">
                <FaShieldAlt className="logo-icon" />
                <h2>AuthFusion</h2>
            </div>


            <div className="nav-right">

                <div className="user-info">

                    <FaUserCircle className="user-icon" />

                    <div>
                        <h4>
                            {user?.name || "User"}
                        </h4>

                        <span>
                            {user?.email || "user@email.com"}
                        </span>
                    </div>

                </div>


                <button
                    className="logout-btn"
                    onClick={() => {
                        logout();
                        navigate("/");
                    }}
                >
                    <FaSignOutAlt />
                    Logout
                </button>


            </div>

        </nav>
    );
}

export default Navbar;