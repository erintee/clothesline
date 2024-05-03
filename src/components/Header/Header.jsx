import './Header.scss';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, setUser, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setIsLoggedIn(false)
    }

    return (
        <header className='header'>
            <div className='header__content'>
                <span className='header__logo' onClick={() => navigate("/")}>ClothesLine</span>
                {isLoggedIn?
                    <div className='header__text-container'>
                        <p className='header__name' onClick={() => navigate(`/closets/${user.id}`)} >{user.firstName}</p>
                        <p className='header__logout' onClick={handleLogout}>Log Out</p>
                    </div>
                    : <></>
                }
            </div>
        </header>
    )
}

export default Header;