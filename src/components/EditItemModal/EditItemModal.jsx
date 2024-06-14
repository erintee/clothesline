import "./EditItemModal.scss";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import FormError from "../FormError/FormError";
import Modal from "../Modal/Modal";

const EditItemModal = ({ isOpen, onClose, user, itemId }) => {

    const [ title, setTitle ] = useState("");
    const [ type, setType ] = useState("");
    const [ colour, setColour ] = useState("");
    const [ size, setSize ] = useState("");
    const [ image, setImage ] = useState("");
    const [ filename, setFilename ] = useState("");
    const [ displayImage, setDisplayImage ] = useState("");
    const [ error, setError ] = useState(false);

    // Load item details
    const fetchItem = useCallback (async () => {
        try {
            const response = await axios.get(`${BASE_URL}/items/${itemId}`);
            const item = response.data;
            setTitle(item.title);
            setType(item.type);
            setColour(item.colour);
            setSize(item.size);
            setDisplayImage(item.image);
        } catch (error) {
            console.error('Error fetching item data:', error)
        }
    }, [itemId])

    useEffect(() => {
        if (isOpen && itemId) {
        fetchItem();
        }

    }, [isOpen, itemId, fetchItem]);

    // Check form has no empty fields
    const isFormValid = () => {
        if (!title || !type || !colour || !size ) {
            setError(true);
            return false;
        }
        return true;
    };
    
    // Handle clear on manual modal close
    const handleClearFields = () => {
        setTitle("");
        setType("");
        setColour("");
        setSize("");
        setImage("");
    }

    // Handle manual clear on button click
    const handleClear = (e) => {
        e.preventDefault();
        handleClearFields();
    }

    // Submit form with put request
    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = isFormValid();

        if(!valid) {
            return;
        }

        const formData = new FormData();
        
        if (filename !== "") {
            const newfilename = filename.replace("C:\\fakepath\\", "")
            formData.append('filename', newfilename);
            formData.append('image', image);
        }
        
        formData.append('user_id', user.id)
        formData.append('title', title);
        formData.append('type', type);
        formData.append('colour', colour);
        formData.append('size', size);

        const token = localStorage.getItem("authToken");
        const config = {
            headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}
        }

        try {
            await axios.put(`http://localhost:8080/api/items/${itemId}`, formData, config);
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} clearFields={handleClearFields}>
        <form className="edit-form" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h1 className="edit-form__title">Edit Item</h1>
            <section className="edit-form__content">
                <section className="edit-form__content-block">
                    <label className='edit-form__label' htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            className="edit-form__input"
                            onChange={(e) => {setTitle(e.target.value)}}
                            placeholder={title}
                        />
                    <FormError errorState={error} field={title}>Please enter a title</FormError>


                    <label className='edit-form__label' htmlFor="type">Type</label>

                        <select
                            name="type"
                            id="type"
                            value={type}
                            onChange={(e) => {setType(e.target.value)}}
                            className='edit-form__input'
                        >
                            {!type && <option value=''>Select</option>}
                            <option value='shirt'>Shirts</option>
                            <option value='pants'>Pants</option>
                            <option value='dress'>Dresses</option>
                            <option value='skirt'>Skirts</option>
                            <option value='shoes'>Shoes</option>
                            <option value='outerwear'>Outerwear</option>
                            <option value='accessory'>Accessories</option>                    
                        </select>
                    <FormError errorState={error} field={type}>Please enter a type</FormError>
            
                    <label className='edit-form__label' htmlFor="colour">Colour</label>
                        <select
                            name="colour"
                            id="colour"
                            value={colour}
                            onChange={(e) => setColour(e.target.value)}
                            className='edit-form__input'
                        >
                            {!colour && <option value=''>Select</option>}
                            <option value='white'>White</option>
                            <option value='black'>Black</option>
                            <option value='blue'>Blue</option>
                            <option value='gold'>Gold</option>
                            <option value='green'>Green</option>
                            <option value='grey'>Grey</option>
                            <option value='orange'>Orange</option>
                            <option value='pink'>Pink</option>
                            <option value='purple'>Purple</option>
                            <option value='red'>Red</option>
                            <option value='silver'>Silver</option>
                            <option value='yellow'>Yellow</option>
                        </select>
                    <FormError errorState={error} field={colour}>Please enter a colour</FormError>

                    <label className='edit-form__label' htmlFor="size">Size</label>
                        {type === "shoes" ?
                            <select
                                name="size"
                                id="size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="edit-form__input"
                            >
                                {!size && <option value=''>Select</option>}
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                            </select>
                            :
                            <select
                                name="size"
                                id="size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="edit-form__input"
                            >
                                {!size && <option value=''>Select</option>}
                                <option value='XXS/0/25'>XXS/0/25</option>
                                <option value='XS/2/26'>XS/2/32</option>
                                <option value='S/4/27'>S/4/27</option>
                                <option value='M/6/28'>M/6/28</option>
                                <option value='M/8/29'>M/8/29</option>
                                <option value='L/10/30'>L/10/30</option>
                                <option value='L/12/31'>L/12/31</option>
                                <option value='XL/14/32'>XL/14/32</option>
                                <option value='2XL/16/33'>2XL/16/33</option>
                                <option value='3XL/18/34'>3XL/18/34</option>
                                <option value='N/A'>N/A</option>
                            </select>
                        }
                    <FormError errorState={error} field={size}>Please enter a size</FormError>
                </section>
                <section className="edit-form__content-block">
                    <label className="edit-form__label" htmlFor="image">Upload photo
                        <input 
                            className="edit-form__input edit-form__input--image"
                            type="file" 
                            name="image"
                            id="image" 
                            onChange={(e) => {
                                setImage(e.target.files[0])
                                setFilename(e.target.value)
                            }}
                        />
                    </label>
                    <div className="edit-form__image-container">
                        <img className="edit-form__image" src={`http://localhost:8080/uploads/${displayImage}`} alt={title}/>
                    </div>

                    <div className="edit-form__buttons">
                        <ButtonPrimary
                            type="submit"
                            onClick={handleSubmit}
                        >Edit</ButtonPrimary>
                        <ButtonSecondary
                            clickHandler={handleClear} 
                        >Clear</ButtonSecondary>
                    </div>  
                </section>
            </section>
        </form>
    </Modal>
    )
}

export default EditItemModal