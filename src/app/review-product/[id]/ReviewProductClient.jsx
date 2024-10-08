"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import useFetchDocument from "@/hooks/useFetchDocument";
import { useSelector } from "react-redux";
import { addDoc, Timestamp, collection } from "firebase/firestore";

import { selectUserID, selectUserName } from "@/redux/slice/authSlice";

import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";

import Loader from "@/components/loader/Loader";

import styles from "./ReviewProduct.module.scss";
import { Rating } from "react-simple-star-rating";
import { db } from "@/firebase/firebase";

const ReviewProductClient = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");

  const router = useRouter();
  const { id } = useParams();
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  console.log("id", id);
  const { document: product } = useFetchDocument("products", id);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewData = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewData);
      router.push(`/product-details/${id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <section className={styles.review}>
      <Heading title="상품평 작성하기" />
      {product === null ? (
        <Loader basic />
      ) : (
        <div>
          <p>
            <b>상품 이름:</b> {product.name}
          </p>
          <Image
            src={product.imageURL}
            alt={product.name}
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      <div className={styles.card}>
        <form action="" onSubmit={(e) => submitReview(e)}>
          <label> 평점:</label>
          <Rating
            initialValue={rate}
            onClick={(rate) => {
              setRate(rate);
            }}
          />
          <label>상품평</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            cols={30}
            rows={10}
          />
          <Button type="submit">상품평 작성하기</Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewProductClient;
