"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

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
import { selectIsLoggedIn } from "@/redux/slice/authSlice";

import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { FaTrashAlt } from "react-icons/fa";
import { priceFormat } from "@/utils/priceFormat";

import styles from "./CartClient.module.scss";

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
  return (
    <section className={styles.table}>
      <Heading title="장바구니" />
      {cartItems.length === 0 ? (
        <>
          <p className={styles.emptyText}>장바구니가 비어있습니다.</p>
          <div className={styles.emptyText}>
            <Link href="/">계속 쇼핑하기 </Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
                <th>삭제</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((cart, index) => {
                const { id, name, price, cartQuantity, imageURL } = cart;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}원</td>
                    <td>
                      <div className={styles.count}>
                        <button onClick={() => decreaseCart(cart)}>-</button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button onClick={() => increaCart(cart)}>+</button>
                      </div>
                    </td>
                    <td>{priceFormat(price * cartQuantity)}원</td>
                    <td className={styles.icon}>
                      <FaTrashAlt
                        size={19}
                        colors="red"
                        onClick={() => removeFromCart(cart)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <Button onClick={clearCart}>카트 비우기</Button>
            <div className={styles.checkout}>
              <div className={styles.text}>
                <h4>총 상품 개수</h4>
                <p>{cartTotalQuantity}개</p>
              </div>
              <div className={styles.text}>
                <h4>합계</h4>
                <p>{priceFormat(cartTotalAmount)}원</p>
              </div>
              <Button>계산하기</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartClient;
