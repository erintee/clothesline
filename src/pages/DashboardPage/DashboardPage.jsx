import { useNavigate } from "react-router-dom";
import "./DashboardPage.scss";


const DashboardPage = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <h1 className="dashboard__greeting">Hey, {user.firstName}!</h1>
            <section className="actions">
                <div className="actions__explore" onClick={() => navigate("/explore")}>Link to "Explore" page</div>
                <div className="actions__my-closet" onClick={() => navigate(`closets/${user.id}`)}>Link to "My Closet" page</div>
            </section>
        </div>
    )
}

export default DashboardPage