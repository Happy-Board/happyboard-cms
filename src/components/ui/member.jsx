import moment from 'moment-timezone';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    MdBlock,
    MdVerified,
    MdVisibility,
} from 'react-icons/md';
import styles from '@/styles/members.module.css';

export const UserRow = ({ user, handleActive, handleBan }) => {
    const [userRole, setUserRole] = useState(getUserRole(user));
    const [isActive, setIsActive] = useState(user.status === 'active');

    useEffect(() => {
        setUserRole(getUserRole(user));
        setIsActive(user.status === 'active');
    }, [user]);

    function getUserRole(user) {
        if (user.role?.name === 'Super-Admin') return 'Super-Admin';
        if (user.role?.name === 'Admin') return 'Admin';
        if (user.status === 'active') return 'User';
        return 'Pending-user';
    }

    const handleActivate = () => {
        handleActive(user.id);
        setIsActive(true);
        setUserRole('User');
    };

    const handleBanning = () => {
        handleBan(user.id);
        setIsActive(false);
        setUserRole('Pending-user');
    };

    const getRoleClassName = (role) => {
        switch (role) {
            case 'Super-Admin':
                return styles.superAdmin;
            case 'Admin':
                return styles.admin;
            case'Pending-user':
                return styles.pending;
            default:
                return styles.normal;
        }
    };
    const getStatusClassName = (status) => {
        switch (status) {
            case true:
                return styles.active;
            case false:
                return styles.block;
            default:
                return '';
        }
    };

    return (
        <tr key={user.email}>
            <td>
                <div className={styles.user}>
                    <img src={user?.avatar ? user.avatar : "/User_icon_2.svg.png"} className={styles.userImage} alt="" width={40} height={40} />
                    {user.username}
                </div>
            </td>
            <td>{user.email}</td>
            <td>{moment(user.createdAt).format('MMMM Do YYYY')}</td>
            <td className={`${styles.usrl} ${getRoleClassName(userRole)}`}>{userRole}</td>
            <td className={`${styles.usrl} ${getStatusClassName(isActive)}`}>{isActive ? 'Active' : 'Block'}</td>
            <td>
                <div className={styles.buttons}>
                    <Link href={`/members/${user.id}`}>
                        <button className={`status ${styles.view}`} title='View'><MdVisibility /></button>
                    </Link>
                    <button 
                        className={`status ${styles.approve}`}
                        title='Accept'
                        disabled={isActive || userRole === 'Admin' || userRole === 'Super-Admin'}
                        onClick={handleActivate}
                    >
                        <MdVerified />
                    </button>
                    <button 
                        className={`status ${styles.blockBut}`}
                        title='Ban'
                        disabled={!isActive || userRole === 'Super-Admin' || user.id === 1}
                        onClick={handleBanning}
                    >
                        <MdBlock />
                    </button>
                </div>
            </td>
        </tr>
    );
}