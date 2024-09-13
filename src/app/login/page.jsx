"use client";

import "dotenv/config";
import styles from "./src/styles/login.module.css";
import LoginForm from "./src/components/ui/login/loginForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
