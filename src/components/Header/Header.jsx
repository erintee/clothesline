import './Header.scss';
import Logo from '../../assets/logos/clothesline-logo-black.png';
import { Link } from 'react-router-dom';

const Header = ({ user, setUser, isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setIsLoggedIn(false)
    }
    return (
        <header className='header'>
            <div className='header__logo-container'>
                <Link to='/'>
                    <p className='header__logo'>LOGO</p>
                </Link>
            </div>
            {isLoggedIn?
                <div className='header__text-container'>
                    <p className='header__greeting'>{user.firstName}</p>
                    <p className='header__logout' onClick={handleLogout}>Log Out</p>
                </div>
                : <></>
            }
        </header>
    )
}

export default Header;