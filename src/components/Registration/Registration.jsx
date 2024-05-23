import { useState } from 'react';
import axios from 'axios';
import './Registration.scss';
import { BASE_URL } from '../../utils/utils';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import FormError from '../../components/FormError/FormError';
import ErrorIcon from '../../assets/icons/error-24px.svg';

const Registration = ({ setIsLoggedIn }) => {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ error, setError ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);
    const [ existingUser, setExistingUser ] = useState(false);
    

    const isEmailValid = (email) => {
        return /\S+@\S+\.\S+/.test(email)
    }

    const isFormValid = () => {
        if ( !firstName || !lastName || !email || !password || !confirmPassword ) {
            setError(true);
            return false;
        }

        const validEmail = isEmailValid(email);
        if (!validEmail) {
            setEmailError(true);
            return false;
        }

        return true;
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const valid = isFormValid();

        if(!valid) {
            return;
        } else {
            try {
                const newUser = {
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": email,
                    "password": password,
                }
                
                const response = await axios.post(`${BASE_URL}/auth/register`, newUser);

                if(response.status === 201) {
                    localStorage.setItem("authToken", response.data.token)
                    setIsLoggedIn(true);
                }
                
            } catch (error) {
                if(error.response.data === "User already exists") {
                    setExistingUser(true);
                }
                console.error("Registration failed: ", error);
            }
        }
    };

    return (
        <div className='registration'>
            <h1 className='registration__title'>Join the ClothesLine community</h1>
            <form className='registration-form' onSubmit={handleSignup}>
                <label className="registration-form__label">First Name:</label>
                    <input 
                        className={`registration-form__input ${error && !firstName ? "registration-form__input--eror" : ""}`} 
                        type="text" 
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <FormError errorState={error} field={firstName}>First name is required</FormError>

                <label className="registration-form__label">Last Name:</label>
                    <input 
                        className={`registration-form__input ${error && !lastName ? "registration-form__input--eror" : ""}`} 
                        type="text" 
                        name="lastName" 
                        onChange={(e) => setLastName(e.target.value)}    
                    />
                    <FormError errorState={error} field={lastName}>Last name is required</FormError>
                
                <label className="registration-form__label">Email: </label>
                    <input 
                        className={`registration-form__input ${error && !email ? "registration-form__input--eror" : ""}`} 
                        type="text" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormError errorState={error} field={email}>Please enter a valid email address</FormError>
                    {emailError && (
                        <span className='input-error'>
                            <img className='input-error__icon' src={ErrorIcon} alt='ErrorIcon'></img>
                            <p className='input-error__message'>Invalid email address</p>
                        </span>
                    )}
                    {existingUser && (
                        <span className='input-error'>
                            <img className='input-error__icon' src={ErrorIcon} alt='ErrorIcon'></img>
                            <p className='input-error__message'>An account with this email already exists</p>
                        </span>
                    )}
                
                <label className="registration-form__label">Password:</label>
                    <input 
                        className={`registration-form__input ${error && !password ? "registration-form__input--eror" : ""}`} 
                        type="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormError errorState={error} field={password}>Please enter a password</FormError>

                <label className="registration-form__label">Confirm Password:</label>
                    <input 
                        className={`registration-form__input ${error && !confirmPassword ? "registration-form__input--eror" : ""}`} 
                        type="password" 
                        name="confirmPassword" 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormError errorState={error} field={confirmPassword}>Passwords do not match</FormError>

                <div className='registration-form__button'>
                    <ButtonPrimary type='submit'>Register</ButtonPrimary>
                </div>
            </form>
        </div>    
    )
}

export default Registration;