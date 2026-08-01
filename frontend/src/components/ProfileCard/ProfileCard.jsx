import "./ProfileCard.css";
import { FaUserCircle } from "react-icons/fa";

function ProfileCard({ user }) {
    return (
        <div className="profile-card">

            <FaUserCircle className="profile-avatar" />

            <h2>{user?.name}</h2>

            <p>{user?.email}</p>

            <span>Authenticated User</span>

        </div>
    );
}

export default ProfileCard;