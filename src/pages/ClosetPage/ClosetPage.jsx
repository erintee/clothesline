import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import ItemList from "../../components/ItemList/ItemList";

const ClosetPage = () => {
    const [ items, setItems ] = useState([]);
    const [ userName, setUserName ] = useState("");
    const { userId } = useParams();

    useEffect (() => {
        const fetchUserItems = async () => {
            const response = await axios.get(`${BASE_URL}/users/${userId}/items`);
            setItems(response.data);
        }

        fetchUserItems();
    }, []);

    useEffect (() => {
        const fetchUserName = async () => {
            const response = await axios.get(`${BASE_URL}/users/${userId}`);
            const user = response.data.first_name;
            setUserName(user);
        }

        fetchUserName();
    }, []);

    return (
        <div className="closet">
            <section className="closet__header">
                <h1 className="closet__title">{userName}'s Closet</h1>
            </section>
            <ItemList
                data={items}
            />
        </div>
    )
}

export default ClosetPage;