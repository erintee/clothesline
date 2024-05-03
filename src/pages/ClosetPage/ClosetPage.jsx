import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import ItemList from "../../components/ItemList/ItemList";
import "./ClosetPage.scss";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";

const ClosetPage = ({ user }) => {
    const [ items, setItems ] = useState([]);
    const [ userName, setUserName ] = useState("");
    const { userId } = useParams();
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect (() => {
        const fetchUserItems = async () => {
            const response = await axios.get(`${BASE_URL}/users/${userId}/items`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
            setItems(response.data);
        }

        fetchUserItems();
    }, [userId, token]);

    useEffect (() => {
        const fetchUserName = async () => {
            const response = await axios.get(`${BASE_URL}/users/${userId}`);
            const user = response.data.first_name;
            setUserName(user);
        }

        fetchUserName();
    }, [userId]);

    return (
        <div className="closet">
            <section className="closet__header">
                <h1 className="closet__title">{userName}'s Closet</h1>
                {Number(userId) === user.id ?
                    <>
                        <div className="closet__add-button--mobile" onClick={() => navigate("/add")}>
                        +
                        </div> 
                        <div className="closet__add-button--td">
                            <ButtonPrimary clickHandler={() => navigate("/add")}>+ Add item</ButtonPrimary>
                        </div>
                    </> : 
                    <></>
                }
            </section>
            <ItemList
                data={items}
            />
        </div>
    )
}

export default ClosetPage;