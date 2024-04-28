import './Item.scss';

const Item = ({item}) => {
    console.log(item);

    console.log(`http://localhost:8080/${item.image}`)
    return (
        <div className='item'>
            <div className='item__image-container'>
                <img className='item__image' src={`http://localhost:8080/uploads/${item.image}`}/>
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