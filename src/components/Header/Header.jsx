import './Header.scss';
import { useNavigate } from 'react-router-dom';
import logoIcon from '../../assets/logos/clothesline-pin.png';
import addFriendsIcon from '../../assets/icons/add-friends-icon.png';

const Header = ({ user, setUser, isLoggedIn, setIsLoggedIn, handleOpenSearchModal }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setIsLoggedIn(false)
        navigate("/")
    }

    return (
        <header className='header'>
            <div className='header__content'>
                <div className='header__logo-container' onClick={() => navigate("/")}>
                    <img className='header__logo-icon' src={logoIcon} alt='clothespin icon'/>
                    <span className='header__logo'>ClothesLine</span>
                </div>
                <div className='header__user-container'>
                    {isLoggedIn?
                    <>
                        <span className='header__add-friend-container'>
                            <img className='header__add-friends-icon' src={addFriendsIcon} onClick={handleOpenSearchModal} alt='add friends icon'/>
                        </span>
                        <span className='header__text-container'>
                            <p className='header__name' onClick={() => navigate(`/closets/${user.id}`)} >{user.firstName}</p>
                            <p className='header__logout' onClick={handleLogout}>Log Out</p>
                        </span>
                    </>
                    : <></>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;