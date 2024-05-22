import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import './RequestDetailsModal.scss';
import { BASE_URL } from '../../utils/utils';
import Modal from '../Modal/Modal';
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import sendIcon from '../../assets/icons/send-icon64.png';

export default function ItemDetailsModal ({ isOpen, onClose, requestId, user }) {

    const [ item, setItem ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const [ newMessage, setNewMessage ] = useState("");

    const token = localStorage.getItem("authToken");
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    }
    
    // Load request details
    useEffect(() => {
        const fetchRequest = async () => {
            const token = localStorage.getItem("authToken");

            try {
                const response = await axios.get(`${BASE_URL}/requests/${requestId}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });                
                setItem(response.data)

              } catch (error) {
                console.error('Error fetching request details:', error)
            }
        }

      if (isOpen && requestId) {
        fetchRequest();
      }

    }, [requestId, isOpen]);

    // Load message history
    const fetchRequestMessages = useCallback (async () => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await axios.get(`${BASE_URL}/requests/${requestId}/messages`, {
                headers: {Authorization: `Bearer ${token}`}
            });                
            setMessages(response.data)
          } catch (error) {
            console.error('Error fetching message history:', error)
        }
    }, )

    useEffect(() => {
      if (isOpen && requestId) {
        fetchRequestMessages();
      }
    }, [requestId, isOpen]);

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(newMessage) {
            const body = {
                "user_id": user.id,
                "message": newMessage,
            }

            try {
                await axios.post(`${BASE_URL}/requests/${requestId}/messages`, body, config)
                fetchRequestMessages();
            } catch (error) {
                alert("Could not send message");
            }
        }
    }

    // Clickable actions
    const cancelRequest = async () => {
        try {
            await axios.delete(`${BASE_URL}/requests/${requestId}`, config)
            onClose();
        } catch (error) {
            alert("Could not delete request");
        }
    }

    const acceptRequest = async () => {
        const body = {
            "status": "accepted",
        }

        try {
            await axios.put(`${BASE_URL}/requests/${requestId}`, body, config)
            onClose();
        } catch (error) {
            alert("Could not update request");
        }
    }

    const declineRequest = async () => {
        const body = {
            "status": "declined",
        }

        try {
            await axios.put(`${BASE_URL}/requests/${requestId}`, body, config)
            onClose();
        } catch (error) {
            alert("Could not update request");
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <>
            <section className='request-modal__content-container'>
                <section className='request-modal__item-container'>
                    <div className='request-modal__image-container'>
                      <img className='request-modal__image' src={`http://localhost:8080/uploads/${item.image}`} alt={item.title} />
                    </div>
                    <h2 className='request-modal__header'>{item.title}</h2>
                    {/* <p className="request-modal__size">Size {item.size}</p> */}
                </section>
                <section className="request-modal__text-container">
                    <section className="messages">
                        <h3 className="messages__header">Messages</h3>
                        <div className="messages__container">
                            {messages.map((message)=>{
                                return (
                                    <article 
                                        key={message.id}
                                        className={`messages__item ${Number(user.id) === message.user_id ? "messages__item--user" : ""}`}
                                    >
                                        <p className="messages__username">{message.first_name}</p>
                                        <p className={`messages__message-body ${Number(user.id) === message.user_id ? "messages__message-body--user" : ""}`}>{message.message}</p>
                                    </article>
                                )
                            })}
                        </div>
                    </section>
                    <form className="messages__form" onSubmit={handleSubmit}>
                        <input className="messages__input" type="text" value={newMessage} placeholder="Send a message" onChange={(e) => setNewMessage(e.target.value)}></input>
                        <div className='messages__icon-container' onClick={handleSubmit}>
                            <img className="messages__send-icon" src={sendIcon} alt="send message"/>      
                        </div>
                    </form>
                    {item.status === "pending" ?
                      <div className='request-modal__actions'>
                          {user.id === item.user1_id ? 
                          <>
                              <div className='request-modal__button' onClick={cancelRequest}>
                                  <ButtonSecondary>Cancel request</ButtonSecondary>
                              </div>
                          </> :
                          <>
                              <div className='request-modal__button' onClick={acceptRequest}>
                                  <ButtonPrimary>Accept</ButtonPrimary>
                              </div>
                              <div className='request-modal__button' onClick={declineRequest}>
                                  <ButtonSecondary>Decline</ButtonSecondary>
                              </div>
                          </>
                          }
                      </div> :
                          <p className={`request-modal__tag ${item.status === "accepted" ? "request-modal__tag--accepted" : ""}`}>
                            {item.status}
                          </p>
                    }
                </section>
            </section>
            </>
        </Modal>
    );
};

