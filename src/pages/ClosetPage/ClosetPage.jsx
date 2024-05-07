import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import "./ClosetPage.scss";
import ItemList from "../../components/ItemList/ItemList";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import AddItemModal from "../../components/AddItemModal/AddItemModal";
import hanger from "../../assets/icons/clothes-hanger.png";

const ClosetPage = ({ user }) => {
    const [ items, setItems ] = useState([]);
    const [ userName, setUserName ] = useState("");
    const [ addModalOpen, setAddModalOpen ] = useState(false);
    const [ authorized, setAuthorized ] = useState(false);

    const { userId } = useParams();
    
    useEffect (() => {
        const fetchUserItems = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`${BASE_URL}/users/${userId}/items`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );
                setAuthorized(true);
                setItems(response.data);
                
            } catch (error) {
                console.log(error)              
            }
        }

        fetchUserItems();
    }, [userId]);


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

    if (!authorized) {
        return (
            <div className="unauthorized">
                <h1>Oops!</h1>
                <p>Looks like you're not friends with this user. Add friends on ClothesLine to start swapping!</p>
            </div>
        )
    }

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
            {Number(userId) === user.id && items.length === 0 ?
                <div className="placeholder">
                    <img className="placeholder__icon" src={hanger} alt="https://www.flaticon.com/free-icons/clothing"/>
                    <h2 className="placeholder__message">Your closet is empty. Add items to see your clothing here!</h2>
                </div> :
                <ItemList
                    data={items}
                />
            }
        </div>
    )
}

export default ClosetPage;