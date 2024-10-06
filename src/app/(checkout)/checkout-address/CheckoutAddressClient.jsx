"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "@/redux/slice/checkoutSlice";

import styles from "./CheckoutAddress.module.scss";

const initialAddressState = {
  name: "",
  line: "",
  city: "",
  postalCode: "",
};

const CheckoutAddressClient = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleShipping = (e) => {
    const { name, value } = e.target.value;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target.value;
    setBillingAddress({ ...billingAddress, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    router.push("/checkout");
  };

  return <div>check</div>;
};

export default CheckoutAddressClient;
