import Item from '../Item/Item';
import './ItemList.scss';

const ItemList = ({data}) => {
    return (
        <div className='item-list'>
        {data.map((item)=> {
            return(    
                <Item
                    key={item.id}
                    item={item}
                />
            )
        })}
        </div>
    )
}

export default ItemList;
