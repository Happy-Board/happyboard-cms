'use client'


import styles from '@/styles/users.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {
    MdBlock,
    MdVerified,
    MdVisibility,
} from 'react-icons/md';
import Pagination from "@/components/pagination";
import { useUsersData } from '@/hooks/useUsersData';
import moment from 'moment-timezone';
import { useActiveUser } from '@/hooks/Publish/publish';
import { useBanUser } from '@/hooks/Publish/unPublish';
import { useState } from 'react';

const UsersPage = ({ searchParams }) => {


    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const { users: initialUsers, count, loading } = useUsersData(q, page);
    const [users, setUser] = useState(initialUsers);

    const { activeUser } = useActiveUser();
    const { banUser } = useBanUser();

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    const handleActive = async (id) => {
        try {
            await activeUser(id);
            if (isSuccess) {
                setUser(prevUsers =>
                    prevUsers.map(user =>
                        user.id === id ? { ...user, status: 'active' } : user
                    )
                );
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
            } else {
                console.error("Failed to ban user");
            }
        } catch (error) {
            console.error("Error banning user:", error);
        }
    }

    return (
        <div className={styles.container} >
            <div className={styles.top} />
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
                        <tr key={user.email}>
                            <td>
                                <div className={styles.user}>
                                    <Image src="/User_icon_2.svg.png" className={styles.userImage} alt="" width={40} height={40} />
                                    {user.username}
                                </div>
                            </td>
                            <td>{user.email}</td>

                            <td>{moment(user.createdAt).format('MMMM Do YYYY')}</td>
                            <td className={styles.usrl} >{user.role?.name || 'No role'}</td>
                            <td className={styles.usrs} >{user.status}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/users/${user.id}`}>
                                        <button className={`status ${styles.view}`} title='View' ><MdVisibility />
                                        </button>
                                    </Link>
                                    <button className={`status ${styles.approve}`}
                                        title='Accept'
                                        disabled={user.status == 'active'}
                                        onClick={() => {
                                            handleActive(user.id);
                                            window.location.reload();
                                        }}>
                                        <MdVerified />
                                    </button>
                                    <button className={`status ${styles.block}`}
                                        title='Ban'
                                        disabled={user.status == 'block'||user.id==1}
                                        onClick={() => {
                                            handleBan(user.id)
                                            window.location.reload();
                                        }}>
                                        <MdBlock />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />

        </div>
    );
}

export default UsersPage;