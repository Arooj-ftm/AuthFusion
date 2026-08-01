import "./StatCard.css";

function StatCard({ icon, title, value }) {
    return (
        <div className="stat-card">

            <div className="stat-icon">
                {icon}
            </div>

            <h3>{title}</h3>

            <p>{value}</p>

        </div>
    );
}

export default StatCard;