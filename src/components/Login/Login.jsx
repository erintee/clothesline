import { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { BASE_URL } from "../../utils/utils";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary'
import FormError from '../../components/FormError/FormError';
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(false);
    const [ foundUser, setFoundUser ] = useState(true);
    const navigate = useNavigate();

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
            navigate("/");
        } catch (error) {
            if (error.response.status === 401) {
                setError(true);
                setFoundUser(false);
            }
            console.error("Login error: ", error);
        }
    };

    return (
        <div className="login">
            <h1 className="login__title">Sign in to your account</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <label className="login-form__label">Email</label>
                <input
                    className={`login-form__input ${error && !email ? "login-form__input--eror" : ""}`} 
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormError errorState={error} field={email}>Please enter your email</FormError>

                <label className="login-form__label">Password</label>
                <input
                    className={`login-form__input ${error && !password ? "login-form__input--eror" : ""}`} 
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormError errorState={error} field={password}>Please enter your password</FormError>
                <FormError errorState={error} field={foundUser}>Incorrect username or password</FormError>
                

                <div className="login-form__button">
                    <ButtonPrimary type="submit">Login</ButtonPrimary>
                </div>
            </form>
        </div>
    )
}

export default Login;