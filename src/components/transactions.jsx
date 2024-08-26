import styles from '@/styles/transactions.module.css'
import moment from 'moment-timezone';
import Skeleton from './Skeleton';
import { useEffect, useRef, useState } from 'react';
import useAuth from '@/lib/auth';
import { fetchUsers } from '@/lib/data';



const Transaction = () => {
    const q = 5;
    const page = 1;

    const { uid, isAuthenticated } = useAuth();
    const [users, setUsers] = useState([]);
    const intervalRef = useRef(null)

    const loadUsers = async () => {
        if (isAuthenticated && uid) {
            const { users } = await fetchUsers(uid, q, page);
            setUsers(users);
        }
    };
    useEffect(() => {
        loadUsers()

        intervalRef.current = setInterval(() => {
            loadUsers();
        }, 300000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [uid])
    const SkeletonRow = () => (
        <tr>
            <td><Skeleton width="180px" height="40px" /></td>
            <td><Skeleton width="70px" height="40px" /></td>
            <td><Skeleton width="70px" height="40px" /></td>
        </tr>
    );

    const renderContent = () => {
        if (users.length === 0) {
            return Array(q).fill().map((_, index) => (
                <SkeletonRow key={index} />
            ));
        }

        return users.map(user => (<tr key={user.id}>
            <td>
                <div className={styles.user}>
                    <img className={styles.userImage} src={user?.avatar ? user.avatar : "/User_icon_2.svg.png"} alt="" width={40} height={40} />
                    {user.username}
                </div>
            </td>
            <td>
                <span className={`${styles.status} ${user.isOnline ? styles.Online : styles.Off}`}>
                    {user.isOnline ? 'Online' : 'Offline'}
                </span>                    </td>
            <td>{moment(user.createdAt).format('MMMM Do YYYY')}</td>

        </tr>))
    };

    return (<div className={styles.container} >
        <h2 className={styles.title}>
            Latest Registation
        </h2>
        <table className={styles.table}>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Status</td>
                    <td>Registation Date</td>
                </tr>
            </thead>
            <tbody>
                {renderContent()}
            </tbody>
        </table>
    </div>);
}

export default Transaction;