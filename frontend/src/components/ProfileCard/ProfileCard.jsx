import "./ProfileCard.css";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function ProfileCard() {

    const { user } = useAuth();

    if (!user) {
        return (
            <div className="profile-card">
                <h3>No User Data Found</h3>
                <p>Please login to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="profile-card">

            <FaUserCircle className="profile-avatar" />

            <h2>{user.name}</h2>

            <p>{user.email}</p>

            <span>Authenticated User</span>

        </div>
    );
}

export default ProfileCard;