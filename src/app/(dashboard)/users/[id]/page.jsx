'use client'
import styles from "@/styles/singleUser.module.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUsersData } from '@/hooks/useUsersData';
import { useEffect, useState } from "react";





const SigleUserPage = ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const email = usePathname();
    const cleanedEmail = email.split("/").pop().toString().replace(/\s+|%40/g, '@');
    const { users, loading } = useUsersData(q, page);
    const [isActive, setIsActive] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!loading && users.length > 0) {
            const foundUser = users.find(userInfo => userInfo.email === cleanedEmail);
            setUser(foundUser);

            if (foundUser) {
                setIsActive(foundUser.status);
            }
        }
    }, [users, loading, cleanedEmail]);

    if (loading) return <div>Loading...</div>
    if (!user) return <div>Loading</div>

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer} >
                <div className={styles.imgContainer}>
                    <Image alt="" fill />
                </div>
                {user.username}
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <input type="hidden" name="id" />
                    <label>Username</label>
                    <div type="text" className={styles.name} > {user.username} </div>
                    <label>Email</label>
                    <div type="email" className={styles.email} > {user.email} </div>
                    {/* <label>Password</label>
                    <input type="password" name="password" /> */}
                    {/* <label>Is Admin?</label>
                    <select name="isAdmin" id="isAdmin" defaultValue={isAdminSelect}>
                        <option value={false} >No</option>
                        <option value={true} >Yes</option>
                    </select> */}
                    <label>Is Active?</label>
                    <select name="isActive" id="isActive" defaultValue={isActive}>
                        <option value={true} >Yes</option>
                        <option value={false} >No</option>
                    </select>
                    <button>Update</button>
                    <button style={{ backgroundColor: 'red' }}>Delete</button>
                </form>
            </div>
        </div>
    );
}

export default SigleUserPage;