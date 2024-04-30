import { useState } from 'react';
import './AuthPage.scss';
import Login from '../../components/Login/Login';
import Registration from '../../components/Registration/Registration';

const AuthPage = ({ setIsLoggedIn }) => {
    const [ isRegistered, setIsRegistered ] = useState(true);

    return (
        <>
            {isRegistered ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Registration setIsRegistered={setIsRegistered} />
            )}
        </>
    )
}

export default AuthPage;