'use client'

import styles from "@/styles/loginForm.module.css";
import { useState } from "react";
import useAuth from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('');
    try {
      const success = await login(formData.email, formData.password);
      if (success == 1) {
        console.log('Success: Sign in successfully!');
        toast.success("Success: Sign in successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await delay(1000);
        router.push('/dashboard');
      } else {
        setError('Login failed. Please use Admin account!!!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  }


  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
        <button type="submit" >Login</button>
      </form >
      <ToastContainer />
    </>
  );
};

export default LoginForm;