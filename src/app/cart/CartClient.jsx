import { useDispatch, useSelector } from "react-redux";
import styles from "./CartClient.module.css";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SAVE_URL,
} from "@/redux/slice/cartSlice";
import { useRouter } from "next/navigation";
import { selectIsLoggedIn } from "@/redux/slice/authSlice";
import { useEffect } from "react";

const CartClient = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);
  return <div></div>;
};

export default CartClient;
