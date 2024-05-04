import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import ItemList from "../../components/ItemList/ItemList";
import "./ClosetPage.scss";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import AddItemModal from "../../components/AddItemModal/AddItemModal";

const ClosetPage = ({ user }) => {
    const [ items, setItems ] = useState([]);
    const [ userName, setUserName ] = useState("");
    const [ addModalOpen, setAddModalOpen ] = useState(false);

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

    const handleOpenAddModal = (event) => {
        setAddModalOpen(true);
    };
  
    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    return (
        <div className="closet">
            {Number(userId) === user.id && 
                <AddItemModal
                    isOpen={addModalOpen}
                    onClose={handleCloseAddModal}
                    user={user}
                ></AddItemModal>
            }
            <div className="closet__header-container">
                <section className="closet__header">
                    <h1 className="closet__title">
                        {Number(userId) === user.id ?
                        "My Closet" :
                        `${userName}'s Closet`}
                    </h1>
                    {Number(userId) === user.id ?
                        <>
                            <div className="closet__add-button--mobile" onClick={handleOpenAddModal}>
                            +
                            </div> 
                            <div className="closet__add-button--td">
                                <ButtonPrimary clickHandler={handleOpenAddModal}>+ Add item</ButtonPrimary>
                            </div>
                        </> : 
                        <></>
                    }
                </section>
            </div>
            <ItemList
                data={items}
            />
        </div>
    )
}

export default ClosetPage;