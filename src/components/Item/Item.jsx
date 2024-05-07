import './Item.scss';
import hanger from '../../assets/icons/clothes-hanger.png'

const Item = ({item, handleOpenItemModal}) => {

    const image = `http://localhost:8080/uploads/${item.image}`
    
    return (
        <div className='item' id={item.id} onClick={handleOpenItemModal}>
            <div className='item__image-container'>
                <img className='item__image' src={image ? image : hanger} alt={item.title}/>
            </div>
            <div className='item__text-container'>
                <p className='item__title'>{item.title}</p>
                <p className='item__size'>{item.size}</p>
                <p className='item__user'>{item.first_name}</p>
            </div>
        </div>
    )
}

export default Item;