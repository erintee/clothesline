import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.scss';
import logoIcon from '../../assets/logos/clothesline-pin.png';
import addFriendsIcon from '../../assets/icons/add-friends-icon.png';

const Header = ({ user, setUser, isLoggedIn, setIsLoggedIn, handleOpenSearchModal }) => {
    const [ hamburgerOpen, setHamburgerOpen ] = useState(false)

    const navigate = useNavigate()

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    const handleLogoNavigate = () => {
        setHamburgerOpen(false);
        navigate("/");
    }

    const handleClosetNavigate = () => {
        setHamburgerOpen(false);
        navigate(`/closets/${user.id}`);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setIsLoggedIn(false);
        setHamburgerOpen(false);
        navigate("/");
    }

    return (
        <header className='header'>
            <div className='header__content'>
                <div className='header__logo-container' onClick={handleLogoNavigate}>
                    <img className='header__logo-icon' src={logoIcon} alt='clothespin icon'/>
                    <span className='header__logo'>ClothesLine</span>
                </div>
                <div className='header__menu-container'>
                    {isLoggedIn?
                    <>
                        <span className='header__add-friend-container'>
                            <img className='header__add-friends-icon' src={addFriendsIcon} onClick={handleOpenSearchModal} alt='add friends icon'/>
                        </span>
                        <div className={`header__navmenu ${hamburgerOpen ? "header__navmenu--show" : ""}`}>
                            <ul className="header__navlist">
                                <li className='header__list-item header__list-item--name'onClick={handleClosetNavigate}>{user.firstName}</li>
                                <li className='header__list-item' onClick={handleLogout}>Log Out</li>
                            </ul>
                        </div>
                        <div className="header__hamburger-container" onClick={toggleHamburger}>
                            <div className="hamburger">
                                <div className={`hamburger__line ${hamburgerOpen ? "hamburger__line--1" : ""}`}></div>
                                <div className={`hamburger__line ${hamburgerOpen ? "hamburger__line--2" : ""}`}></div>
                                <div className={`hamburger__line ${hamburgerOpen ? "hamburger__line--3" : ""}`}></div>
                            </div>
                        </div>
                    </>
                    : <></>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;