import "./AddItemModal.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import FormError from "../FormError/FormError";
import Modal from "../Modal/Modal";

const AddItemModal = ({ isOpen, onClose, user }) => {
    const navigate = useNavigate();

    const [ image, setImage ] = useState();
    const [ title, setTitle ] = useState("");
    const [ type, setType ] = useState("");
    const [ filename, setFilename ] = useState("");
    const [ colour, setColour ] = useState("");
    const [ size, setSize ] = useState("");
    const [ error, setError ] = useState(false);

    const isFormValid = () => {
        if (!title || !type || !colour || !size) {
            setError(true);
            return false;
        }
        return true;
    };
    
    const handleClear = () => {
        setTitle("");
        setType("");
        setColour("");
        setSize("");
    }

    const addItem = async (e) => {
        e.preventDefault();
        const valid = isFormValid();

        if(!valid) {
            return;
        }

        const newfilename = filename.replace("C:\\fakepath\\", "")
        const formData = new FormData();
        formData.append('user_id', user.id)
        formData.append('title', title);
        formData.append('type', type);
        formData.append('colour', colour);
        formData.append('size', size);
        formData.append('image', image);
        formData.append('filename', newfilename);

        const config = {headers: {'Content-Type': 'multipart/form-data'}}

        try {
            const response = await axios.post('http://localhost:8080/api/items', formData, config);
            if (response.status === 201) {
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
        }
        
    }
    
    const handleSubmit = () => {
        addItem();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
            <section className="form__content">
                <h1 className="form__title">Add an item to your closet</h1>
                <label className='form__label' htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        // id="title"
                        className="form__input"
                        onChange={(e) => {setTitle(e.target.value)}}
                    />
                <FormError errorState={error} field={title}>Please enter a title</FormError>


                <label className='form__label' htmlFor="type">Type</label>

                    <select
                        name='type'
                        value={type}
                        onChange={(e) => {setType(e.target.value)}}
                        className='form__input'
                    >
                        <option value=''>Select</option>
                        <option value='shirt'>Shirts</option>
                        <option value='pants'>Pants</option>
                        <option value='dress'>Dresses</option>
                        <option value='skirt'>Skirts</option>
                        <option value='shoes'>Shoes</option>
                        <option value='outerwear'>Outerwear</option>
                        <option value='accessory'>Accessories</option>                    
                    </select>
                <FormError errorState={error} field={type}>Please enter a type</FormError>
        
                <label className='form__label' htmlFor="colour">Colour</label>
                    <select
                        name='colour'
                        value={colour}
                        onChange={(e) => setColour(e.target.value)}
                        className='form__input'
                    >
                        <option value=''>Select</option>
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

                <label className='form__label' htmlFor="size">Size</label>
                    {type === "shoes" ?
                        <select
                            name='size'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className='form__input'
                        >
                            <option value=''>Select</option>
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
                            name='size'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className='form__input'
                        >
                            <option value=''>Select</option>
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

                <label className="form__label" htmlFor="image">Upload photo</label>
                    <input 
                        className="form__input form__input--image"
                        type='file' 
                        name='image' 
                        onChange={(e) => {
                            setImage(e.target.files[0])
                            setFilename(e.target.value)
                        }}
                    />
            </section>
            <div className='form__buttons'>
                <ButtonPrimary
                    type="submit"
                >Add</ButtonPrimary>
                <ButtonSecondary
                    clickHandler={handleClear} 
                >Clear</ButtonSecondary>
            </div>
        </form>
    </Modal>
    )
}

export default AddItemModal