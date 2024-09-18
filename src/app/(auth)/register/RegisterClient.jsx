"use client";

import { useState } from "react";
import Image from "next/image";
import LogoPath from "@/assets/colorful.svg";
import { useRouter } from "next/navigation";
import styles from "../login/Auth.module.scss";
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import Divider from "@/components/divider/Divider";
import Button from "@/components/button/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const RegisterClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/login");
  };

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      return toast.error("비밀번호가 일치하지 않습니다.");
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);

        toast.success("회원가입이 완료되었습니다.");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image priority src={LogoPath} alt="logo" />
          </h1>
          <form onSubmit={registerUser} className={styles.form}>
            <Input
              email
              icon="letter"
              id="email"
              label="이메일"
              placeholder="아이디(이메일)"
              name="email"
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              password
              autoComplete="off"
              icon="lock"
              id="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호"
              className={styles.control}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              password
              autoComplete="off"
              icon="lock"
              id="new-password"
              name="new-password"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              className={styles.control}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <div className={styles.buttonGroup}>
              <Button type="submit" width="100%">
                회원가입
              </Button>
              <Divider />
              <Link href={"login"}>
                <Button width="100%" secondary>
                  로그인
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterClient;
