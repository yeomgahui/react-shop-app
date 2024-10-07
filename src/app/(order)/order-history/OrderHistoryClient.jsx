"use client";

import useFetchCollection from "@/hooks/useFetchCollection";
import { STORE_ORDERS } from "@/redux/slice/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectOrderHistory } from "@/redux/slice/orderSlice";
import { selectUserID } from "@/redux/slice/authSlice";

const OrderHistoryClient = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  return <div></div>;
};

export default OrderHistoryClient;
