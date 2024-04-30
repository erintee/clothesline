import './FormError.scss';
import ErrorIcon from '../../assets/icons/error-24px.svg';

export default function FormError ({ errorState, field, children }) {
    return (
        <>
        {errorState && !field && (
            <span className='input-error'>
                <img className='input-error__icon' src={ErrorIcon} alt='ErrorIcon'></img>
                <p className='input-error__message'>{children}</p>
            </span>
        )}
        </>
    )
}

/* How to use this component:
"errorState" refers to the state variable that you have defined for storing error state (default, false)
"field" refers to the state variable that holds the value fo the input

In your form, your line of code to insert this should look like:
    <FormError errorState={error} field={item}>Item is required</FormError>
*/