import React, { useState } from "react";
import { itemRemoveFromCart, loadCart } from "../../action/action";
import {useDispatch, useSelector} from 'react-redux';

function CartItem({product}) {
  const [productQuantity,setProductQuantity] = useState(product.quantity)
  const dispatch = useDispatch();
  const handleRemove = async()=>{
    await itemRemoveFromCart(product.product._id);
    await loadCart(dispatch);
  }
  const quantityHandle = (e)=>{
    const newQuantity = parseInt(e.target.value);
    setProductQuantity(newQuantity);
  }
  return (
    <>
      <tr>
        <td>
          <div className="cart-info">
            <img src={product.product.images[0].url} alt="" />
            <div>
              <p>{product.product.name}</p>
              <span>{product.product.price}</span> <br />
              <button onClick={handleRemove}>
                Remove
              </button>
            </div>
          </div>
        </td>
        <td>
          <input type="number" 
            onChange={quantityHandle} 
            value={productQuantity}
            min="1"
          />
        </td>
        <td>{product.quantity * product.product.price}</td>
      </tr>
    </>
  );
}

export default CartItem;

