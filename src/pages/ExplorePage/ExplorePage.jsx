import axios from 'axios';
import { useEffect, useState } from 'react';
import ItemList from "../../components/ItemList/ItemList";
import Item from '../../components/Item/Item';
import { BASE_URL } from '../../utils/utils';
import './ExplorePage.scss';

const ExplorePage = () => {
    const [ data, setData ] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/items`);
                setData(response.data);
            } catch (error) {
                console.error("Unable to retrieve data", error)
            }
        }

        fetchData();
    }, []);

    console.log(data);

    if (!data) {
        return<>Loading...</>
    }
    return (
        <ItemList 
            data={data}
        />
    )
}

export default ExplorePage;