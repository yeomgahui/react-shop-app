import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { priceFormat } from "@/utils/priceFormat";

import rocketBadgeIcon from "@/assets/badge-rocket.svg";
import styles from "./ProductItem.module.scss";

const ProductItem = ({ id, name, price, imageURL }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            <strong style={{ color: "#cb1400" }}>{priceFormat(price)}</strong>원{" "}
            <Image src={rocketBadgeIcon} alt="로켓배송" />
          </em>
          <div className={styles.rating}>
            <Rating readonly size={17} initialValue={1} />
            <span className={styles.ratingount}>(3)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
