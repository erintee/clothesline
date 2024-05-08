import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashboardPage.scss";
import { BASE_URL } from "../../utils/utils";
import RequestItem from "../../components/RequestItem/RequestItem";
import RequestDetailsModal from "../../components/RequestDetailsModal/RequestDetailsModal";


const DashboardPage = ({ user }) => {
    const navigate = useNavigate();
    const [ requestModalOpen, setRequestModalOpen ] = useState(false);
    const [ selectedRequest, setSelectedRequest ] = useState("");
    const [ requests, setRequests ] = useState([]);
    const { incoming, outgoing, history } = requests;
  
    
    const fetchRequests = async () => {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/requests/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        setRequests(response.data)
    }
    
    useEffect(() =>{
        fetchRequests();
    }, []);
    
    const handleOpenRequestModal = (event) => {
        const id = event.currentTarget.id;
        setSelectedRequest(id);
        window.scrollTo(0,0);
        setRequestModalOpen(true);
    };
  
    const handleCloseRequestModal = () => {
        setRequestModalOpen(false);
        fetchRequests();
    };
    
    if (!requests.incoming || !requests.outgoing || !requests.history) {
        return <span className="loader"></span>
    }


    return (
        <div className="dashboard">
            <RequestDetailsModal
                isOpen={requestModalOpen}
                onClose={handleCloseRequestModal}
                requestId={selectedRequest}
                user={user}
            />
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
                        
                        <div className="requests">
                            <p className="dashboard__subheader">Swap</p>
                            <section className="requests__content-container">
                                <div className="requests__section">
                                    <p className="requests__label">{incoming.length} Incoming</p>
                                    <div className="requests__list">
                                        {incoming.map((item)=> {
                                            return(    
                                                <RequestItem
                                                    key={item.id}
                                                    id={item.id}
                                                    item={item}
                                                    user={user}
                                                    handleOpenRequestModal={handleOpenRequestModal}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="requests__section">
                                    <p className="requests__label">{outgoing.length} Outgoing</p>
                                    <div className="requests__list">
                                        {outgoing.map((item)=> {
                                            return(    
                                                <RequestItem
                                                    key={item.id}
                                                    id={item.id}
                                                    item={item}
                                                    user={user}
                                                    handleOpenRequestModal={handleOpenRequestModal}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="requests__section">
                                    <p className="requests__label">Request history</p>
                                    <div className="requests__list">
                                    {history.length > 0 ? 
                                        history.map((item)=> {
                                            return(    
                                                <RequestItem
                                                    key={item.id}
                                                    id={item.id}
                                                    item={item}
                                                    user={user}
                                                    handleOpenRequestModal={handleOpenRequestModal}
                                                />
                                            )
                                        }) :
                                        <p className="requests__placeholder">Try browsing your friends' closets to plan your first swap!</p>
                                    }
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default DashboardPage