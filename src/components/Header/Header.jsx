import './Header.scss';
import Logo from '../../assets/logos/clothesline-logo-black.png';

const Header = () => {
    return (
        <header className='header'>
            <div className='header__logo-container'>
                <p className='header__logo'>LOGO</p>
            </div>
            <div className='header__text-container'>
                <p className='header__greeting'>Hi, User!</p>
            </div>
        </header>
    )
}

export default Header;