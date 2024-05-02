import Item from '../Item/Item';
import './ItemList.scss';

const ItemList = ({ data, handleOpenItemModal }) => {
    return (
        <div className='item-list'>
        {data.map((item)=> {
            return(    
                <Item
                    key={item.id}
                    item={item}
                    handleOpenItemModal={handleOpenItemModal}
                />
            )
        })}
        </div>
    )
}

export default ItemList;
