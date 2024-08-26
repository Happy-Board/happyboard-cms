import moment from 'moment-timezone';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    MdBlock,
    MdHighlightOff,
    MdVerified,
    MdVisibility,
} from 'react-icons/md';
import styles from '@/styles/members.module.css';
import { Flip, toast } from 'react-toastify';

export const UserRow = ({ user, handleActive, handleBan }) => {
    const [userRole, setUserRole] = useState(getUserRole(user));
    const [isActive, setIsActive] = useState(user.status === 'active');
    const [isProcessing, setIsProcessing] = useState(false);

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

    const handleActivate = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            await handleActive(user.id);
            setTimeout(() => {
                setIsActive(true);
                setUserRole('User');
                setIsProcessing(false);
                toast.success("User activated successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            }, 100);
        } catch (error) {
            console.error("Error activating user:", error);
            setIsProcessing(false);
        }
    };

    const handleBanning = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            await handleBan(user.id);
            setTimeout(() => {
                setIsActive(false);
                setUserRole('Pending-user');
                setIsProcessing(false);
                toast.error("User banned successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                    icon: ({ theme, type }) => <MdHighlightOff style={{ color: 'red' }} />,
                });
            }, 100);
        } catch (error) {
            console.error("Error banning user:", error);
            setIsProcessing(false);
        }
    };

    const getRoleClassName = (role) => {
        switch (role) {
            case 'Super-Admin':
                return styles.superAdmin;
            case 'Admin':
                return styles.admin;
            case 'Pending-user':
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
                {isProcessing && <div className={styles.dotspinner}>
                    <div className={styles.dotspinnerdot}></div>
                    <div className={styles.dotspinnerdot}></div>
                    <div className={styles.dotspinnerdot}></div>
                    <div className={styles.dotspinnerdot}></div>
                    <div className={styles.dotspinnerdot}></div>
                    <div className={styles.dotspinnerdot}></div>
                    <div className={styles.dotspinnerdot}></div>
                    <div className={styles.dotspinnerdot}></div>
                </div>}{
                    !isProcessing &&
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
                }
            </td>
        </tr>

    );
}