import Heading from "@/components/heading/Heading";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import Button from "@/components/button/Button";

import styles from "./Checkout.module.scss";

const CheckoutClient = () => {
  return (
    <section className={styles.checkout}>
      <Heading title="주문하기" />
      <form>
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
