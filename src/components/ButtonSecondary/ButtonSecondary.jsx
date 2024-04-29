import './ButtonSecondary.scss'

const ButtonSecondary = ({ children, type, clickHandler }) => {
    return (
        <button
            className="secondary-button"
            onClick={clickHandler}
            type={type}
        >
        {children}
        </button>
    )
}

export default ButtonSecondary;