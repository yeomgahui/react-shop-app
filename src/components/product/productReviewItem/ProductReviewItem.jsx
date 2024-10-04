import { Rating } from "react-simple-star-rating";
import styles from "./ProductReviewItem.module.css";
import { formatTime } from "@/utils/dayjs";

const ProductReviewItem = ({ rate, review, reviewDate, userName }) => {
  return (
    <div className={styles.review}>
      <p className={styles.writer}>
        {userName} <span>님의 상품평</span>
      </p>
      <Rating initialValue={rate} size={25} readonly />
      <p className={styles.content}>{review}</p>
      <p className={styles.date}>{formatTime(reviewDate)}</p>
    </div>
  );
};

export default ProductReviewItem;
