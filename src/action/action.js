import axios from "axios";
import { useDispatch } from "react-redux";
import { cartItems } from "../reducers/cartSlice";
import { baseApiUrl } from "../features/api";


export const loadCart = async (dispatch) => {
  try {
    const {data} = await axios.get(`${baseApiUrl}/api/v1/cart`);
    dispatch(cartItems(data.cart.cartItems));
  } catch (error) {
    console.log(error);
  }
}

export const itemRemoveFromCart = async(productId)=>{
  try {
    const {data} = await axios.delete(`${baseApiUrl}/api/v1/cart/${productId}`);
  } catch (error) {
    console.log(error);
  }
}