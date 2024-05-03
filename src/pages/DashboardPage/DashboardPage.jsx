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
            const response = await axios.get(`${BASE_URL}/requests/${user.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setRequests(response.data)
        }

        fetchRequests();
    }, []);

    if (!requests.incoming || !requests.outgoing) {
        return <>Loading</>
    }

    return (
        <div className="dashboard">
            <div className="dashboard__background"></div>
            <section className="dashboard__content">
                <h1 className="dashboard__greeting">What are you wearing today?</h1>
                <div className="dashboard__actions-container">
                    <section className="dashboard__actions">
                        <div className="dashboard__link dashboard__link--explore" onClick={() => navigate("/explore")}>
                            <p className="dashboard__subheader">Browse</p>
                        </div>
                        <div className="dashboard__link dashboard__link--my-closet" onClick={() => navigate(`closets/${user.id}`)}>
                            <p className="dashboard__subheader">My closet</p>
                        </div>
                        
                        <div className="dashboard__link dashboard__link--requests">
                            <p className="dashboard__subheader">Swap</p>
                            <div className="requests">
                                <div className="requests__section">
                                    <span 
                                        className="requests__alert">
                                        {requests.incoming.length}
                                    </span>
                                    <p className="requests__label">incoming</p>
                                </div>
                                <div className="requests__section">
                                <span 
                                        className="requests__alert">
                                        {requests.outgoing.length}
                                    </span>
                                    <p className="requests__label">outgoing</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default DashboardPage