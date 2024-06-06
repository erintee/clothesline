import "./SearchUsersModal.scss";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import Modal from "../Modal/Modal";
import searchIcon from "../../assets/icons/search-icon.png";

const SearchUsersModal = ({ isOpen, onClose }) => {
    const [ friends, setFriends ] = useState([]);
    const [ incoming, setIncoming ] = useState([]);
    const [ outgoing, setOutgoing ] = useState([]);
    const [ email, setEmail ] = useState("");
    const [ results, setResults ] = useState({});
    
    const navigate = useNavigate();

    const token = localStorage.getItem("authToken");
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    // Get existing friend data
    const fetchFriendshipData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/friendships`, config)
            const { friends, incoming, outgoing } = response.data;
            setFriends(friends);
            setIncoming(incoming);
            setOutgoing(outgoing);
        } catch (error) {
            console.error("Unable to fetch friendship data", error)
        }
    }

    // Load existing friend data
    useEffect (() => {
        if (isOpen) {
            fetchFriendshipData();
        }
    }, [isOpen]);

    // Search for users by email address
    const fetchResults = useCallback (async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/search/${email}`, config); 
            setResults(response.data)
        } catch (error) {
            if(error.response.status === 404) {
                setResults("")
            }
            console.error(`Unable to fetch user data for email ${email}`)
        }
    }, [email])

    // Load search results
    useEffect (() => {
        if (isOpen) {
            fetchResults();
        }
    }, [setEmail, isOpen, fetchResults])

    // Search form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchResults();
    }

    // Add users from search results
    const handleAddFriend = async () => {
        const body = {
            userId: results.id
        }

        try {
            const response = await axios.post(`${BASE_URL}/friendships`, body, config)
            fetchResults();
            fetchFriendshipData();
        } catch (error) {
            alert("An error occured. Please try again later.");
            console.error("Unable to add friend", error)
        }
    }

    // Accept friend request
    const handleAccept = async (id) => {
        try {
            await axios.put(`${BASE_URL}/friendships/${id}`, {"status": "friends"}, config);
            fetchFriendshipData()
        } catch (error) {
            alert("An error occured. Please try again later.");
            console.error("Unable to accept friendship", error);
        }
    }

    // Decline friend request
    const handleDecline = async (id) => {
        try {
            await axios.put(`${BASE_URL}/friendships/${id}`, {"status": "declined"}, config);
            fetchFriendshipData();
        } catch (error) {
            alert("An error occured. Please try again later.");
            console.error("Unable to decline friendship", error);
        }
    }
    
    // Cancel request or delete friend
    const handleDelete = async (id, message) => {
        try {
            const confirmDel = window.confirm(message);
            if (confirmDel === true) {
                await axios.delete(`${BASE_URL}/friendships/${id}`, config)
                fetchFriendshipData();
                fetchResults();
            } else {
                return;
            }
        } catch (error) {
            alert("An error occured. Please try again later.")
            console.error("Unable to delete friend", error)
        }
    }

    // Navigate to friend's closet when name clicked
    const handleNavigate = (id) => {
        setEmail("");
        setResults("");
        onClose();
        navigate(`/closets/${id}`);
    }

    // Clear fields on manual modal close
    const handleClearFields = () => {
        setEmail("");
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} clearFields={handleClearFields}>
            <div className="search-modal">
                <h1 className="search-modal__header">Find friends on ClothesLine</h1>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input 
                        className="search-form__input"
                        type="text"
                        placeholder="Search by email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="search-form__icon-container" onClick={handleSubmit}>
                        <img className="search-form__icon" src={searchIcon} alt="search users"/>
                    </div>
                </form>
                <div className="search-modal__results">
                    {email.length > 0 ? <span className="search-modal__results-placeholder">{`Results for email "${email}"`}</span> : <></>}
                    { results.first_name ? 
                            <div className="search-modal__results-item">
                                <p className="search-modal__user">{results.first_name}</p>
                                {results.status === "new" ? <div className="search-modal__button" onClick={handleAddFriend}>+ Add</div> : <></>}
                                {results.status === "requested" ? <div className="search-modal__note">Requested</div> : <></>}
                                {results.status === "friends" ? <div className="search-modal__button" onClick={() => handleNavigate(results.id)}>Browse closet</div> : <></>}
                            </div>
                    : <></>
                    }
                </div>
                <div className="friends">
                    <div className="friends__section">
                        <h2 className="friends__header">Incoming Requests</h2>
                        {(incoming.length > 0) ?
                            <div className="friends__list">
                                {incoming.map((request) => {
                                    return (
                                    <div 
                                        key={request.id}
                                        className="friends__item"
                                    >
                                        <p className="friends__user">{request.first_name}</p>
                                        <div className="friends__button" onClick={() => handleAccept(request.id)}>Accept</div>
                                        <div className="friends__button" onClick={() => handleDecline(request.id)}>Decline</div>
                                    </div>)
                                })}
                            </div>
                            : <p className="friends__placeholder">No incoming friendship requests</p>
                        }
                    </div>
                    <div className="friends__section">
                        <h2 className="friends__header">Outgoing Requests</h2>
                        {(outgoing.length > 0) ?
                            <div className="friends__list">
                                {outgoing.map((request) => {
                                    return (
                                    <div 
                                        key={request.id}
                                        className="friends__item"
                                    >
                                        <p className="friends__user">{request.first_name}</p>
                                        <div className="search-modal__button" onClick={() => handleDelete(request.id, "Cancel request?")}>Cancel</div>
                                    </div>)
                                })}
                            </div>
                            : <p className="friends__placeholder">No outgoing friendship requests</p>
                        }
                    </div>
                    <div className="friends__section">
                        <h2 className="friends__header">Friends</h2>
                        {(friends.length > 0) ?
                            <div className="friends__list">
                                {friends.map((friendship) => {
                                    return (
                                    <div 
                                        key={friendship.id}
                                        className="friends__item"
                                    >
                                        <p className="friends__user" onClick={() => handleNavigate(friendship.user_id)}>{friendship.first_name}</p>
                                        <div className="search-modal__button" onClick={() => handleDelete(friendship.id, "Delete friend?")}>Delete</div>
                                    </div>)
                                })}
                            </div>
                            : <p className="friends__placeholder">Add friends to see them here</p>
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SearchUsersModal;