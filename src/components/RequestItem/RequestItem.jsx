import './RequestItem.scss';

const RequestItem = ({user, item, handleOpenRequestModal}) => {

    return (
        <div className='request-item' id={item.id} onClick={handleOpenRequestModal}>
            <div className='request-item__image-container'>
                <img className='request-item__image' src={`http://localhost:8080/uploads/${item.image}`} alt={item.title}/>
            </div>
            <div className='request-item__text-container'>
                <p className='request-item__user'>
                    {item.user1_id === user.id ?
                        `You asked ${item.first_name}` :
                        `Requested by ${item.first_name}`
                    }
                </p>
            </div>
        </div>
    )
}

export default RequestItem;