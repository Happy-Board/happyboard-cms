import styles from '@/styles/members.module.css';
import Search from '@/components/ui/search';
import Pagination from "@/components/pagination";


export default function Loading() {
    return <div className={styles.container} >
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
        </table>
        <div className={styles.newtonscradle}>
            <div className={styles.newtonscradledot}></div>
            <div className={styles.newtonscradledot}></div>
            <div className={styles.newtonscradledot}></div>
            <div className={styles.newtonscradledot}></div>
        </div>
        <Pagination />
    </div>
}