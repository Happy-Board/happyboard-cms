'use client'


import styles from '@/styles/users.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {
    MdBlock,
    MdDeleteOutline,
    MdVisibility,
} from 'react-icons/md';
import Search from "@/components/ui/search";
import Pagination from "@/components/pagination";
import { useUsersData } from '@/hooks/useUsersData';
import moment from 'moment-timezone';

const UsersPage = ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    // const { users, count, loading } = useUsersData(q, page);
    const { users, count, loading } = useUsersData(q,page);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className={styles.container} >
            <div className={styles.top}>
                <Search placeholder="Search for user..." />
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
                    {users.map((user) => (
                        <tr key={user.email}>
                            <td>
                                <div className={styles.user}>
                                    <Image src="/User_icon_2.svg.png" className={styles.userImage} alt="" width={40} height={40} />
                                    {user.username}
                                </div>
                            </td>
                            <td>{user.email}</td>

                            <td>{moment(user.createdAt).format('MMMM Do YYYY')}</td>
                            <td className={styles.usrl} key={user.id}>{user.role}</td>
                            <td className={styles.usrs} key={user.id}>{user.status}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/users/${user.email}`}>
                                        <button className={`status ${styles.view}`} title='View'><MdVisibility />
                                        </button>
                                    </Link>
                                    <button className={`status ${styles.block}`} title='Ban' disabled> <MdBlock /></button>
                                    <button className={`status ${styles.delete}`} title='Delete'><MdDeleteOutline />
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