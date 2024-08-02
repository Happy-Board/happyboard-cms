
import styles from '../../ui/dashboard/users/users.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {
    MdBlock,
    MdDeleteOutline,
    MdVisibility,
} from 'react-icons/md';
import Search from "../../ui/dashboard/search/search";
import Pagination from "../../ui/dashboard/pagination/pagination";


const UsersPage = () => {
    return (<div className={styles.container} >
        <div className={styles.top}>
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
                <tr>
                    <td>
                        <div className={styles.user}>
                            <Image src="/User_icon_2.svg.png" className={styles.userImage} alt="" width={40} height={40} />
                            Astersa
                        </div>
                    </td>
                    <td>example@gmail.com</td>

                    <td>DD.MM.YYYY</td>
                    <td>Admin</td>
                    <td>Active</td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href={`/dashboard/users/id`}>
                                <button className={`${styles.status} ${styles.view}`} title='View'><MdVisibility />
                                </button>
                            </Link>
                            <button className={`${styles.status} ${styles.block}`} title='Ban' disabled> <MdBlock /></button>
                            <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                            </button>
                        </div>
                    </td>

                </tr>
                <tr>
                    <td>
                        <div className={styles.user}>
                            <Image src="/User_icon_2.svg.png" className={styles.userImage} alt="" width={40} height={40} />
                            John Doe
                        </div>
                    </td>
                    <td>example@gmail.com</td>

                    <td>DD.MM.YYYY</td>
                    <td>Client</td>
                    <td>Banned</td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href='/dashboard/users/id'>
                                <button className={`${styles.status} ${styles.view}`} title='View'><MdVisibility />
                                </button>
                            </Link>
                            <button className={`${styles.status} ${styles.block}`} title='Unban' > <MdBlock /></button>
                            <button className={`${styles.status} ${styles.delete}`} title='Delete' ><MdDeleteOutline />
                            </button>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
        <Pagination />

    </div>);
}

export default UsersPage;