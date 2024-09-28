"use client";

import useFetchCollection from "@/hooks/useFetchCollection";

import styles from "./Product.module.scss";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  return (
    <section className={styles.product}>
      <aside className={styles.filter}></aside>
      <div className={styles.content}></div>
    </section>
  );
};

export default Product;
