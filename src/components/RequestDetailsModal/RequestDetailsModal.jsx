import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './RequestDetailsModal.scss';
import { BASE_URL } from '../../utils/utils';
import Modal from '../Modal/Modal';
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";

export default function ItemDetailsModal ({ isOpen, onClose, requestId, user }) {

  const [ item, setItem ] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${BASE_URL}/requests/${requestId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        setItem(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching item data:', error)
      }
    }

    if (isOpen && requestId) {
      fetchRequest();
    }

  }, [isOpen, requestId]);

//   const sendRequest = async (id) => {     
//     try {
//       const token = localStorage.getItem("authToken");
      
//       const body = {
//         "user1": user.id,
//         "user2": item.user_id,
//         "message": message
//       }

//       const response = await axios.post(`${BASE_URL}/requests/${id}`, body, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//         });

//     } catch (error) {
//       console.error('Could not update request', error)
//     }
//   }
  
//   const handleSubmit = () => {
//     sendRequest(itemId);
//     onClose();
//   }

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
                <div className='request-modal__actions'>
                    {user.id === item.user1_id ? 
                    <>
                        <div className="request-modal__buton">
                            <ButtonPrimary>Edit</ButtonPrimary>
                        </div>
                        <div className='request-modal__button'>
                            <ButtonSecondary>Cancel request</ButtonSecondary>
                        </div>
                    </> :
                    <>
                        <div className='request-modal__button'>
                            <ButtonPrimary>Accept</ButtonPrimary>
                        </div>
                        <div className='request-modal__button'>
                            <ButtonSecondary>Decline</ButtonSecondary>
                        </div>
                    </>
                    }
                </div>
            </section>
        </section>
        </>
    </Modal>
  );
};

