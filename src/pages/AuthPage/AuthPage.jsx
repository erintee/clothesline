import { useState } from 'react';
import './AuthPage.scss';
import Login from '../../components/Login/Login';
import Registration from '../../components/Registration/Registration';

const AuthPage = ({ setIsLoggedIn }) => {
    const [ isRegistered, setIsRegistered ] = useState(true);

    return (
        <>
        <article className='login'>
            <section className='login__nav'>
                <div className='login__nav-link' onClick={() => setIsRegistered(true)}>Login</div>
                <div className='login__nav-link' onClick={() => setIsRegistered(false)}>Sign Up</div>
            </section>

            <section className='login__form-container'>

            {isRegistered ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Registration setIsRegistered={setIsRegistered} />
            )}
            </section>
        </article>
        </>
    )
}

export default AuthPage;