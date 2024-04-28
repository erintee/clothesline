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
            console.log("filtering")
            const response = await axios.get(`${BASE_URL}/items?${queryStr}`)
            setData(response.data);
        } catch (error) {
            console.error("Unable to retrieve data", error)
        }
    })

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
                <input name='type' onChange={(e) => setType(e.target.value)}/>
        
                <label className='search__label'>Colour</label>
                <input name='type' onChange={(e) => setColour(e.target.value)}/>

                <label className='search__label'>Size</label>
                <input name='type' onChange={(e) => setSize(e.target.value)}/>
            
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