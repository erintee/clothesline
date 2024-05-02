import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import ItemList from "../../components/ItemList/ItemList";
import { BASE_URL } from '../../utils/utils';
import './ExplorePage.scss';
import filterIcon from '../../assets/icons/filter-icon.svg';
import ButtonSecondary from '../../components/ButtonSecondary/ButtonSecondary';
import ItemDetailsModal from '../../components/ItemDetailsModal/ItemDetailsModal';

const ExplorePage = () => {
    const [ data, setData ] = useState([]);
    const [ isFilterVisible, setIsFilterVisible ] = useState(false);
    const [ type, setType ] = useState("");
    const [ colour, setColour] = useState("");
    const [ size, setSize ] = useState("");
    const [ queryStr, setQueryStr ] = useState("");
    let [ searchParams, setSearchParams ] = useSearchParams();
    const [ itemModalOpen, setItemModalOpen ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState("");
  
    const handleOpenItemModal = (event) => {
        const id = event.currentTarget.id;
        setSelectedItem(id);
        setItemModalOpen(true);
    };
  
    const handleCloseItemModal = () => {
        setItemModalOpen(false);
    };


    const fetchData = useCallback( async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(`${BASE_URL}/items?${queryStr}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error("Unable to retrieve data", error)
        }
    }, [queryStr])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleShowFilters = () => {
        isFilterVisible ? setIsFilterVisible(false) : setIsFilterVisible(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const params = {
            type: type,
            colour: colour,
            size: size,
        }
        setSearchParams(params);

        const searchQuery = `type=${type}&colour=${colour}&size=${size}`
        setQueryStr(searchQuery)
        fetchData();
    }

    const handleClear = () => {
        setType("");
        setColour("");
        setSize("");
        fetchData();
    }

    if (!data) {
        return<>Loading...</>
    }

    return (
    <>
        <ItemDetailsModal
            isOpen={itemModalOpen}
            onClose={handleCloseItemModal}
            itemId={selectedItem}
        />
        <div className='filter'>
            <button className='filter-button' onClick={handleShowFilters}>
                {isFilterVisible ? 
                <img src={filterIcon} className='filter-button__image filter-button__image--up' alt="filter icon"/> :
                <img src={filterIcon} className='filter-button__image' alt="filter icon"/>
                }
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
            </button>
                
            <div className={isFilterVisible ? 'search' : 'search search--hidden'}>
                <form className='search__form' onSubmit={handleSubmit}>
                    <label className='search__label'>Type:</label>
                    <select
                        name='type'
                        value={type}
                        onChange={(e) => {setType(e.target.value)}}
                        className='search__input'
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
            
                    <label className='search__label'>Colour:</label>
                    <select
                        name='colour'
                        value={colour}
                        onChange={(e) => setColour(e.target.value)}
                        className='search__input'
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

                    <label className='search__label'>Size:</label>
                    {type === "shoes" ?
                        <select
                            name='size'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className='search__input'
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
                            className='search__input'
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
                            <option value='N/A/'>N/A</option>
                        </select>
                    }
                    <div className='search__buttons'>
                        <ButtonPrimary
                            type="submit"
                        >Filter</ButtonPrimary>
                        <ButtonSecondary
                            clickHandler={handleClear}
                        >Clear</ButtonSecondary>
                    </div>
                </form>
            </div>
        </div>
        <ItemList 
            data={data}
            handleOpenItemModal={handleOpenItemModal}
        />
    </>
    )
}

export default ExplorePage;