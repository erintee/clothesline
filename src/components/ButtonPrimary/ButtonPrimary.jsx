import './ButtonPrimary.scss'

const ButtonPrimary = ({ children, type, clickHandler }) => {
    return (
        <button
            className="primary-button"
            onClick={clickHandler}
            type={type}
        >
        {children}
        </button>
    )
}

export default ButtonPrimary;