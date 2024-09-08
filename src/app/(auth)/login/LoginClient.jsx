"use client";

import { useState } from "react";
import Image from "next/image";
import LogoPath from "@/assets/colorful.svg";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.scss";
import Loader from "@/components/loader/Loader";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const loginUser = (e) => {
    e.preventDefaut();
    setIsLoading(true);
  };
  const signInWithGoogle = () => {
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image priority src={LogoPath} alt="logo" />
          </h1>
          <form onSubmit={loginUser} className={styles.form}>
            Input
            <div className={styles.group}>
              {/* 자동 로그인, 비밀번호 수정 */}
            </div>
            <div className={styles.buttonGroup}>
              {/* Button */}
              <div>{/* Button */}</div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
