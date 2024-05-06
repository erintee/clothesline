import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './ItemDetailsModal.scss';
import Modal from '../Modal/Modal';
import { BASE_URL } from '../../utils/utils';
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";

export default function ItemDetailsModal ({ isOpen, onClose, itemId, user }) {

  const navigate = useNavigate();
  const [ item, setItem ] = useState("");
  const [ message, setMessage ] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items/${itemId}`);
        setItem(response.data)
      } catch (error) {
        console.error('Error fetching item data:', error)
      }
    }

    if (isOpen && itemId) {
      fetchItem();
    }

  }, [isOpen, itemId]);

  const sendRequest = async (id) => {     
    try {
      const token = localStorage.getItem("authToken");
      
      const body = {
        "user1": user.id,
        "user2": item.user_id,
        "message": message
      }

      const response = await axios.post(`${BASE_URL}/requests/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        });
      
      if(response.status === 201){
        //put a success message here?
      }

    } catch (error) {
      console.error('Could not send request', error)
    }
  }
  
  const handleSubmit = () => {
    sendRequest(itemId);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <>
        <section className='item-modal__content-container'>
          <section className='item-modal__item-container'>
            <div className='item-modal__image-container'>
              <img className='item-modal__image' src={`http://localhost:8080/uploads/${item.image}`} alt={item.title} />
            </div>
            <div className='item-modal__header'>{item.title}</div>
            <div className='item-modal__details'>
              <p className='item-modal__tag'>size {item.size}</p>
              <p className='item-modal__tag'>{item.type}</p>
              <p className='item-modal__tag'>{item.colour}</p>
            </div>
          </section>
          <section className="item-modal__request-container">
            <form onSubmit={handleSubmit} className="item-modal__form">
              <label className="item-modal__label">Let {item.first_name} know you'd like to borrow this:</label>
              <textarea
                className="item-modal__input"
                name="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder={`Add a message`} 
              />
            </form>
            <div className='item-modal__actions'>
              <div className='item-modal__submit' onClick={handleSubmit}>
                  <ButtonPrimary>Request</ButtonPrimary>
              </div>
              <div className='item-modal__closet' onClick={() => navigate(`/closets/${item.user_id}`)}>
                  <ButtonSecondary>Browse {item.first_name}'s closet</ButtonSecondary>
              </div>
            </div>
          </section>
        </section>
        </>
    </Modal>
  );
};

