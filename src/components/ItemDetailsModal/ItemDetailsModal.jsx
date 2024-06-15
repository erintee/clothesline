import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DatePicker from "react-datepicker";
import './ItemDetailsModal.scss';
import "react-datepicker/dist/react-datepicker.css";
import Modal from '../Modal/Modal';
import { BASE_URL } from '../../utils/utils';
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import ErrorIcon from "../../assets/icons/error-24px.svg";

export default function ItemDetailsModal ({ isOpen, onClose, itemId, user }) {

  const navigate = useNavigate();
  const [ item, setItem ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ endDateError, setEndDateError ] = useState(false);
  const [ startDateError, setStartDateError ] = useState(false);

  // Load item details
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

  // Handle date selection and check validity on change
  const handleChangeStart = (date) => {
    const current = new Date();
    
    if (date < current) {
      setStartDateError(true);
      return;
    }

    setStartDateError(false);
    const sqlDate = date.toISOString().slice(0, 19);
    console.log(sqlDate)
    setStartDate(sqlDate);
  }

  const handleChangeEnd = (date) => {
    if (date < startDate) {
      setEndDateError(true);
      return;
    }

    setEndDateError(false);
    setEndDate(date);
  }

  // Check if period of request is valid
  const isValidDate = () => {
    if(startDateError || endDateError) {
      return false;
    }
    return true;
  }

  // Send request to server
  const sendRequest = async (id) => {     
    try {
      const token = localStorage.getItem("authToken");
      
      const sqlStartDate = startDate.toISOString().slice(0, 19);
      const sqlEndDate = endDate.toISOString().slice(0, 19);


      const body = {
        "user1": user.id,
        "user2": item.user_id,
        "requestStart": sqlStartDate,
        "requestEnd": sqlEndDate,
        "message": message
      }
      console.log("line 83:", body);
      await axios.post(`${BASE_URL}/requests/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setMessage("");
    } catch (error) {
      console.error('Could not send request', error)
    }
  }
  
  // Handle request submission
  const handleSubmit = (e) => {
    const validDate = isValidDate();    
    if (!validDate) {
      return;
    }

    sendRequest(itemId);
    setStartDate(new Date());
    setEndDate(new Date());
    setMessage("");
    onClose();
  }

  // Clear fields on manual modal close
  const handleClearFields = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setMessage("");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} clearFields={handleClearFields}>
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
              <input className="item-modal__focus-override" type="text"/>
              <label className="item-modal__label">Let {item.first_name} know you'd like to borrow this:</label>
              <section className="item-modal__date-container">
                <label className="item-modal__date">
                  From:
                  <DatePicker
                    className="item-modal__date-input"
                    type="text"
                    size="sm"
                    placeholder="Start date"
                    selected={startDate}
                    onSelect={(date) => handleChangeStart(date)}
                  />
                  {startDateError && (
                        <span className='input-error'>
                            <img className='input-error__icon' src={ErrorIcon} alt='ErrorIcon'></img>
                            <p className='input-error__message'>Invalid start date</p>
                        </span>
                  )}
                </label>
                <label className="item-modal__date">
                  Until:
                  <DatePicker
                    className="item-modal__date-input"
                    type="text"
                    size="sm"
                    placeholder="End date"
                    selected={endDate}
                    onChange={(date) => handleChangeEnd(date)}
                  />
                  {endDateError && (
                        <span className='input-error'>
                            <img className='input-error__icon' src={ErrorIcon} alt='ErrorIcon'></img>
                            <p className='input-error__message'>End date must be after start date</p>
                        </span>
                  )}
                </label>
              </section>
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

