import { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemDetailsModal.scss';
import Modal from '../Modal/Modal';
import { BASE_URL } from '../../utils/utils';

export default function ItemDetailsModal ({ isOpen, onClose, itemId }) {

  const [ item, setItem ] = useState("");

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
      const body = {"user2": item.user_id}
      const response = await axios.post(`${BASE_URL}/requests/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        });
      console.log(response)
      // fetchData();
    } catch (error) {
      console.error('Could not delete warehouse', error)
    }
  }
  
  const handleSubmit = () => {
    console.log(itemId)
    sendRequest(itemId);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} buttonText="Borrow">
        <div className='item-modal__header'>{item.title}
          <span className='item-modal__subheader'>{item.size}</span>
        </div>
        <div className='item-modal__content-container'>
            <div className='item-modal__image-container'>
              <img className='item-modal__image' src={`http://localhost:8080/uploads/${item.image}`} alt={item.title} />
            </div>
            <div className='item-modal__details'>
              <p className='item-modal__tag'>{item.type}</p>
              <p className='item-modal__tag'>{item.colour}</p>
              <p className='item-modal__user'>From {item.first_name}'s closet</p>
            </div>
        </div>
    </Modal>
  );
};

