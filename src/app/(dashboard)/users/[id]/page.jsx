'use client'
import styles from "@/styles/singleUser.module.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUserData } from '@/hooks/useUsersData';
import { useActiveUser } from '@/hooks/Publish/publish';
import { useBanUser } from '@/hooks/Publish/unPublish';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateRole } from '@/hooks/useUpdateRole'


const SigleUserPage = () => {

    const router = useRouter();
    const userId = usePathname().split("/").pop();
    const { user: initialUser, loading: useLoading } = useUserData(userId);
    const { activeUser } = useActiveUser();
    const { banUser } = useBanUser();
    const { updateRole } = useUpdateRole();

    const [user, setUser] = useState(null);
    const [role, setRole] = useState(user?.roles?.name || '');
    const [status, setStatus] = useState(user?.status || '');
    const [loading, setLoading] = useState(false);
    const [roleId, setRoleId] = useState(role);

    useEffect(() => {
        if (initialUser && initialUser.roles) {
            setUser(initialUser);
            setRole(initialUser.roles.name);
            setRoleId(initialUser.roles.id);
            setStatus(initialUser.status);
        } else if (initialUser && initialUser.roles == null) {
            setUser(initialUser);
            setRole('No Role');
            setStatus(initialUser.status);
        }
    }, [initialUser]);
    console.log(user);
    if (useLoading || !user?.roles) {
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
    const handleRole = async () => {
        if (user.roles?.name !== role) {
            try {
                setLoading(true);
                const success = await updateRole(userId, roleId);
                if (success) {
                    setUser(prevUser => ({ ...prevUser, roles: { name: role } }));
                    console.log("Role updated successfully");
                } else {
                    console.error("Failed to update role");
                }
            } catch (err) {
                console.error("Error updating role:", err);
                throw err;
            } finally {
                setLoading(false);
            }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating user:", { userId, role, status });
            await handleRole();
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
                    <Image  src={user?.avatar ? user.avatar : "/User_icon_2.svg.png"}alt="User Image" fill />
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
                    {/* <select
                        name="isAdmin"
                        id="isAdmin"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={user.id == 1}
                    > */}<select
                        name="isAdmin"
                        id="isAdmin"
                        value={roleId}
                        onChange={(e) => {
                            setRoleId(Number(e.target.value));
                            setRole(e.target.options[e.target.selectedIndex].text);
                        }}
                        disabled={user.id == 1}
                    >
                        <option value="3">User</option>
                        <option value="2">Admin</option>
                        <option value="1" disabled>Super-Admin</option>
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