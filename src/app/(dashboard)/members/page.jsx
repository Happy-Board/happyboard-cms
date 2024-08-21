'use client'

import styles from '@/styles/members.module.css';
import Pagination from "@/components/pagination";
import { useUsersData } from '@/hooks/useUsersData';
import { useActiveUser } from '@/hooks/Publish/publish';
import { useBanUser } from '@/hooks/Publish/unPublish';
import { Suspense, useState } from 'react';
import { UserRow } from '@/components/ui/member';
import Search from '@/components/ui/search';
import { toast, ToastContainer } from 'react-toastify';

const UsersPage = ({ searchParams }) => {


    const q = 8;
    const page = searchParams?.page || 1;

    const { users: initialUsers, count } = useUsersData(q, page);
    const [users, setUser] = useState(initialUsers || null);

    const { activeUser } = useActiveUser();
    const { banUser } = useBanUser();

    const handleActive = async (id) => {
        try {
            await activeUser(id);
            if (isSuccess) {
                setUser(prevUsers =>
                    prevUsers.map(user =>
                        user.id === id ? { ...user, status: 'active' } : user
                    )
                );
                toast.success('Active Successfully!!!',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  })
                  return <ToastContainer/>
            } else {
                console.error("Failed to activate user");
            }
        } catch (error) {
            console.error("Error activating user:", error);
        }
    }
    const handleBan = async (id) => {
        try {
            await banUser(id);
            if (isSuccess) {
                setUser(prevUsers =>
                    prevUsers.map(user =>
                        user.id === id ? { ...user, status: 'block' } : user
                    )
                );
                toast.success('Ban Successfully!!!',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  })
                  return <ToastContainer/>
            } else {
                console.error("Failed to ban user");
            }
        } catch (error) {
            console.error("Error banning user:", error);
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.container} >
            <div className={styles.top} >
                <Search />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Registation Date</td>
                        <td>Role</td>
                        <td>Status</td>
                        <td>Action</td>

                    </tr>
                </thead>
                <tbody>
                    {users && initialUsers.map((user) => (
                        <UserRow
                            key={user.email}
                            user={user}
                            handleActive={handleActive}
                            handleBan={handleBan} />
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />

        </div>
        </Suspense>
    );
}

export default UsersPage;
