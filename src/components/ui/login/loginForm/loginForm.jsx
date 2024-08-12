import styles from "@/styles/loginForm.module.css";
import { useState } from "react";
import useAuth from "@/lib/auth";
import { useRouter } from "next/navigation";


const LoginForm = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter()


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('');
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        console.log('Success: Sign in successfully!');
        router.push('/dashboard');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  }


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
      <input type="password" placeholder="Password" name="password" onChange={handleChange} required />

      <button type="submit" >Login</button>
    </form >
  );
};



export default LoginForm;
