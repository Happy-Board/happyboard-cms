'use client'
import styles from "@/styles/singleUser.module.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUserData } from '@/hooks/useUsersData';
import { useActiveUser } from '@/hooks/Publish/publish';
import { useBanUser } from '@/hooks/Publish/unPublish';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const SigleUserPage = () => {

    const router = useRouter();
    const userId = usePathname().split("/").pop();
    const { user: initialUser, loading } = useUserData(userId);
    const { activeUser } = useActiveUser();
    const { banUser } = useBanUser();

    const [user, setUser] = useState(null);
    const [role, setRole] = useState(user?.roles?.name || '');
    const [status, setStatus] = useState(user?.status || '');

    useEffect(() => {
        if (initialUser && initialUser.roles) {
            setUser(initialUser);
            setRole(initialUser.roles.name);
            setStatus(initialUser.status);
        } else if (initialUser && initialUser.roles == null) {
            setUser(initialUser);
            setRole('No Role');
            setStatus(initialUser.status);
        }
    }, [initialUser]);
    console.log(user);
    if (loading || !user?.roles) {
        return <div className={styles.container}>
            <div className={styles.infoContainer} >
                <div className={styles.imgContainer}>
                </div>

            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                </form>
            </div>
        </div>;
    }


    const handleActive = async () => {
        try {
            await activeUser(userId);
            setStatus('active');
            setUser(prevUser => ({ ...prevUser, status: 'active' }));
        } catch (error) {
            console.error("Error activating user:", error);
        }
    }
    const handleBan = async () => {
        try {
            await banUser(userId);
            setStatus('block');
            setUser(prevUser => ({ ...prevUser, status: 'block' }));
        } catch (error) {
            console.error("Error banning user:", error);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating user:", { userId, role, status });
            setTimeout(() => {
                router.push('/users');
            }, 2000);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer} >
                <div className={styles.imgContainer}>
                    <Image alt="" fill />
                </div>
                {user.username}
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleUpdate}>
                    <input type="hidden" name="id" />
                    <label>Username</label>
                    <div type="text" className={styles.name} > {user.username} </div>
                    <label>Email</label>
                    <div type="email" className={styles.email} > {user.email} </div>
                    <label>Role</label>
                    <select
                        name="isAdmin"
                        id="isAdmin"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={user.id == 1}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Super-Admin">Super-Admin</option>
                    </select>
                    <label>Status</label>
                    <select
                        name="isActive"
                        id="isActive"
                        value={status}
                        onChange={(e) => {
                            if (e.target.value === 'active') {
                                handleActive();
                            } else if (e.target.value === 'block') {
                                handleBan();
                            }
                        }}
                        disabled={user.id == 1}
                    >
                        <option value="active" >Active</option>
                        <option value="block" >Block</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default SigleUserPage;