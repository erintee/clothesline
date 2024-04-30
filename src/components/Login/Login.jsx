import { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { BASE_URL } from "../../utils/utils";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary'
import FormError from '../../components/FormError/FormError';

const Login = ({ setIsLoggedIn }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(false);

    const isFormValid = () => {
        if (!email || !password ) {
            setError(true);
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const valid = isFormValid();

        if(!valid) {
            return;
        }
        
        try {
            const user = {
                "email": email,
                "password": password,
            }
            const response = await axios.post(`${BASE_URL}/auth/login`, user);
            
            localStorage.setItem("authToken", response.data)
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login error: ", error);
        }
    };

    return (
        <div className="login">
            <h1 className="login__title">Log in</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <label className="login-form__label">
                    Email:
                    <input
                        className={`login-form__input ${error && !email ? "login-form__input--eror" : ""}`} 
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormError errorState={error} field={email}>Please enter your email</FormError>
                </label>

                <label className="login-form__label">
                    Password:
                    <input
                        className={`login-form__input ${error && !password ? "login-form__input--eror" : ""}`} 
                        type="text"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormError errorState={error} field={password}>Please enter your password</FormError>
                </label>

                <ButtonPrimary
                    type="submit"
                >Login</ButtonPrimary>
            </form>
        </div>
    )
}

export default Login;