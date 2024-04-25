import './Item.scss';

const Item = ({item}) => {
    console.log(item);
    return (
        <div className='item'>
            <div className='item__image-container'>
                <img className='item__image' src={item.image}/>
            </div>
            <div className='item__text-container'>
                <p className='item__description'>{item.colour} {item.type}</p>
                <p className='item__size'>{item.size}</p>
                <p className='item__user'>{item.name}</p>
            </div>
        </div>
    )
}

export default Item;