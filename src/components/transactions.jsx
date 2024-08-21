import { useUsersData } from '@/hooks/useUsersData';
import styles from '@/styles/transactions.module.css'
import moment from 'moment-timezone';


const Transaction = () => {
    const q = 5;
    const page = 1;

    const { users, loading } = useUsersData(q, page);

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
                {users.map(user => (<tr key={user.id}>
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

                </tr>))}

            </tbody>
        </table>
    </div>);
}

export default Transaction;