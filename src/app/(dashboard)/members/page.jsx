'use client'

import styles from '@/styles/members.module.css';
import Pagination from "@/components/pagination";
import { useUsersData } from '@/hooks/useUsersData';
import { useActiveUser } from '@/hooks/Publish/publish';
import { useBanUser } from '@/hooks/Publish/unPublish';
import { Suspense, useEffect, useState } from 'react';
import { UserRow } from '@/components/ui/member';
import Search from '@/components/ui/search';
import "react-toastify/dist/ReactToastify.css";
import Skeleton from '@/components/Skeleton';


const UsersPage = ({ searchParams }) => {


    const q = 8;
    const page = searchParams?.page || 1;

    const { users: initialUsers, count} = useUsersData(q, page);
    const [users, setUsers] = useState(initialUsers || []);


    useEffect(() => {
        setUsers(initialUsers || []);
    }, [initialUsers]);
    const { activeUser } = useActiveUser();
    const { banUser } = useBanUser();

    const handleActive = async (id) => {
        try {
            await activeUser(id);
            if (isSuccess) {
                setUsers(prevUsers =>
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
                setUsers(prevUsers =>
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

    const SkeletonRow = () => (
        <tr>
            <td><Skeleton width="170px" height="40px" /></td>
            <td><Skeleton width="170px" height="20px" /></td>
            <td><Skeleton width="150px" height="20px" /></td>
            <td><Skeleton width="100px" height="20px" /></td>
            <td><Skeleton width="100px" height="20px" /></td>
            <td><Skeleton width="150px" height="40px" /></td>
        </tr>
    );

    const renderContent = () => {
        if (users.length === 0) {
            return Array(q).fill().map((_, index) => (
                <SkeletonRow key={index} />
            ));
        }

        return users.map((user) => (
            <UserRow
                key={user.email}
                user={user}
                handleActive={handleActive}
                handleBan={handleBan}
            />
        ));
    };

    return (
        <Suspense>
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
                        {renderContent()}
                    </tbody>
                </table>
                <Pagination count={count} />
            </div>

        </Suspense>
    );
}

export default UsersPage;
