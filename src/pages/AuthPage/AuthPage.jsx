import { useState } from 'react';
import './AuthPage.scss';
import Login from '../../components/Login/Login';
import Registration from '../../components/Registration/Registration';

const AuthPage = ({ setIsLoggedIn }) => {
    const [ isRegistered, setIsRegistered ] = useState(true);

    return (
        <div className='auth-page'>
        <article className='content'>
            <section className='content__nav'>
                <div 
                    className={`content__nav-link ${isRegistered ? "content__nav-link--active" : ""}`} 
                    onClick={() => setIsRegistered(true)}>Login</div>
                <div 
                    className={`content__nav-link ${!isRegistered ? "content__nav-link--active" : ""}`}
                    onClick={() => setIsRegistered(false)}>Sign Up</div>
            </section>

            <section className='content__form-container'>

            {isRegistered ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Registration setIsRegistered={setIsRegistered} />
            )}
            </section>
        </article>
        </div>
    )
}

export default AuthPage;