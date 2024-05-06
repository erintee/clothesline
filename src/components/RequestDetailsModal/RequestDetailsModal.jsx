import { useEffect, useState } from "react";
import axios from 'axios';
import './RequestDetailsModal.scss';
import { BASE_URL } from '../../utils/utils';
import Modal from '../Modal/Modal';
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";

export default function ItemDetailsModal ({ isOpen, onClose, requestId, user }) {

    const [ item, setItem ] = useState("");

    const token = localStorage.getItem("authToken");
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    }
    
    useEffect(() => {
        const fetchRequest = async () => {
            const token = localStorage.getItem("authToken");

            try {
                const response = await axios.get(`${BASE_URL}/requests/${requestId}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });                
                setItem(response.data)

              } catch (error) {
                console.error('Error fetching item data:', error)
            }
        }

      if (isOpen && requestId) {
        fetchRequest();
      }

    }, [requestId, isOpen]);


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
                    <p className="request-modal__size">Size {item.size}</p>
                </section>
                <section className="request-modal__message-container">
                    {Number(user.id) === item.user1_id ? 
                        <p className="request-modal__label">You said:</p>:
                        <p className="request-modal__label">{item.first_name} says:</p>
                    }
                    <p className="request-modal__message">{item.message}</p>
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

