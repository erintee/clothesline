import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import ItemList from "../../components/ItemList/ItemList";
import { BASE_URL } from '../../utils/utils';
import './ExplorePage.scss';

const ExplorePage = () => {
    const [ data, setData ] = useState([]);
    const [ type, setType ] = useState("");
    const [ colour, setColour] = useState("");
    const [ size, setSize ] = useState("");
    const [ queryStr, setQueryStr ] = useState("");

    const fetchData = useCallback( async () => {
        try {
            const response = await axios.get(`${BASE_URL}/items?${queryStr}`)
            setData(response.data);
        } catch (error) {
            console.error("Unable to retrieve data", error)
        }
    }, [queryStr])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilter = (event) => {
        event.preventDefault();
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
        <div className='search' onSubmit={handleFilter}>
            <form className='search__form'>
                <label className='search__label'>Type</label>
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
        
                <label className='search__label'>Colour</label>
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
                    <option value='orange'>Orange</option>
                    <option value='pink'>Pink</option>
                    <option value='purple'>Purple</option>
                    <option value='red'>Red</option>
                    <option value='silver'>Silver</option>
                    <option value='yellow'>Yellow</option>
                </select>

                <label className='search__label'>Size</label>
                {type === "shoes" ?
                    <select
                        name='size'
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
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
                    </select>
                }
            
                <button type='submit'>Filter</button>
                <button onClick={handleClear}>Clear</button>
            </form>
        </div>
        <ItemList 
            data={data}
        />
    </>
    )
}

export default ExplorePage;