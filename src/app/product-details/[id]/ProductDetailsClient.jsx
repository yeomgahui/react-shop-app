"use client";

import useFetchDocument from "@/hooks/useFetchDocument";
import { useParams } from "next/navigation";

import styles from "./ProductDetailsClient.module.scss";
import Loader from "@/components/loader/Loader";

const ProductDetailsClient = () => {
  const { id } = useParams();

  const { document: product } = useFetchDocument("products", id);

  const addToCart = () => {
    console.log("Add to cart");
  };

  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  const tommorowDate = tomorrow.getDate();
  const tommorowMonth = tomorrow.getMonth();

  return (
    <section className={styles.product}>
      {product === null ? <Loader /> : ""}
    </section>
  );
};

export default ProductDetailsClient;
