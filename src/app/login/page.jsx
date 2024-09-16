"use client";

import "dotenv/config";
import styles from "@/styles/login.module.css";
import LoginForm from "@/components/ui/login/loginForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
