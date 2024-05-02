import { useNavigate } from "react-router-dom";
import "./DashboardPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";


const DashboardPage = ({ user }) => {
    const navigate = useNavigate();
    const [ requests, setRequests ] = useState([]);

    useEffect(() =>{
        const fetchRequests = async () => {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(`${BASE_URL}/users/${user.id}/requests`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setRequests(response.data)
        }

        fetchRequests();
    }, []);

    console.log(requests)

    if (!requests.incoming || !requests.outgoing) {
        return <>Loading</>
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard__greeting">Hey, {user.firstName}!</h1>
            <section className="actions">
                <div className="actions__explore" onClick={() => navigate("/explore")}>Link to "Explore" page</div>
                <div className="actions__my-closet" onClick={() => navigate(`closets/${user.id}`)}>Link to "My Closet" page</div>
                <div className="actions__requests">
                    Requests
                    <p>You have {requests.incoming.length} incoming request{requests.incoming.length === 1 ? "" : 's'}</p>
                    <p>You have {requests.outgoing.length} pending request{requests.outgoing.length === 1 ? "" : 's'}</p>
                </div>
            </section>
        </div>
    )
}

export default DashboardPage