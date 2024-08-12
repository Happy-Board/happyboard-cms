import styles from '@/styles/transactions.module.css'
import Image from "next/image";

const Transaction = () => {
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
                <tr>
                    <td>
                        <div className={styles.user}>
                            <Image className={styles.userImage} src="/User_icon_2.svg.png" alt="" width={40} height={40} />
                            John Doe
                        </div>
                    </td>
                    <td>
                        <span className={`${styles.status} ${styles.Online}`}>Online</span>
                    </td>
                    <td>DD.MM.YYYY</td>

                </tr>
                <tr>
                    <td>
                        <div className={styles.user}>
                            <Image className={styles.userImage} src="/User_icon_2.svg.png" alt="" width={40} height={40} />
                            John Doe
                        </div>
                    </td>
                    <td>
                        <span className={`${styles.status} ${styles.Off}`}>Offline</span>
                    </td>
                    <td>DD.MM.YYYY</td>

                </tr>
            </tbody>
        </table>
    </div>);
}

export default Transaction;