import './Header.scss';
import Logo from '../../assets/logos/clothesline-logo-black.png';

const Header = ({ user, setUser, isLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    }
    return (
        <header className='header'>
            <div className='header__logo-container'>
                <p className='header__logo'>LOGO</p>
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