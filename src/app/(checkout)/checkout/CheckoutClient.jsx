"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loadTossPayments } from "@tosspayments/payment-sdk";

import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";

import {
  CLEAR_CART,
  selectCartTotalAmount,
  selectCartItems,
} from "@/redux/slice/cartSlice";
import { db } from "@/firebase/firebase";
import { selectUserID, selectEmail } from "@/redux/slice/authSlice";
import { selectShippingAddress } from "@/redux/slice/checkoutSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import styles from "./Checkout.module.scss";
const CheckoutClient = () => {
  const userID = useSelector(selectUserID);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const userEmail = useSelector(selectEmail);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tossPayment = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    );

    tossPayment
      .requestPayment("카드", {
        amount: cartTotalAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: "주문",
      })
      .then(async function (data) {
        const { orderId, paymentKey, amount } = data;
        const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

        const url = `https://api.tosspayments.com/v1/payments/confirm`;
        const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString(
          "base64"
        );

        const confirmResponse = fetch(url, {
          method: "post",
          body: JSON.stringify({
            amount,
            orderId,
            paymentKey,
          }),
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());

        console.log("결제 성공", confirmResponse);

        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleDateString();

        const orderData = {
          userID,
          userEmail,
          cartItems,
          orderDate: date,
          orderTime: time,
          orderAmount: amount,
          orderStatus: "주문수락",
          shippingAddress,
          createdAt: Timestamp.now().toDate(),
        };

        await addDoc(collection(db, "orders"), orderData);
        dispatch(CLEAR_CART());

        router.push(`/checkout-success?orderId=${orderId}`);
      })
      .catch((error) => {
        console.log("error", error);
        if (error.code === "USER_CANCEL") {
          toast.error("결제창이 닫아졌습니다.");
        }
      });
  };

  return (
    <section className={styles.checkout}>
      <Heading title="주문하기" />
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <CheckoutForm />
        </div>
        <div>
          <Button type="submit">토스를 이용해서 결제하기</Button>
        </div>
      </form>
    </section>
  );
};

export default CheckoutClient;
