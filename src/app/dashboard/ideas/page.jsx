import Link from 'next/link';
import {
    MdDeleteOutline,
    MdVerified,
    MdVisibility,
} from 'react-icons/md';
import Search from "../../ui/dashboard/search/search";

import Pagination from "../../ui/dashboard/pagination/pagination";

import styles from '../../ui/dashboard/ideas/idea.module.css';
const IdeaPage = () => {
    return (<div className={styles.container} >
        <div className={styles.top}>
            <Search />
        </div>
        <table className={styles.table}>
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Author</td>
                    <td>Requested Date</td>
                    <td>Category</td>
                    <td>Status</td>
                    <td>Action</td>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className={styles.title}>
                            dasdsadsadsadsadasdasdasdsjahgdhjasgdjhasgdjhasgdjhasgdjhasgdjhasgdjhasdjhg
                        </div>
                    </td>
                    <td>John Doe</td>
                    <td>DD.MM.YYYY</td>
                    <td>Technology</td>
                    <td >
                        <span className={`${styles.status} ${styles.released}`}>Released</span></td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href='/dashboard/ideas/id'>
                                <button className={`${styles.status} ${styles.view}`} title='View'><MdVisibility />
                                </button>
                            </Link>
                            <button className={`${styles.status} ${styles.approve}`} title='Release' disabled> <MdVerified /></button>
                            <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                            </button>
                        </div>
                    </td>

                </tr>
                <tr>
                    <td>
                        <div className={styles.title}>
                            dsadddddddddddddddddddddddddddddddddddddddddd
                        </div>
                    </td>
                    <td>Astersa</td>

                    <td>DD.MM.YYYY</td>
                    <td>Culture</td>
                    <td><span className={`${styles.status} ${styles.pending}`}>Pending...</span></td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href='/dashboard/ideas/id'>
                                <button className={`${styles.status} ${styles.view}`} title='View'><MdVisibility />
                                </button>
                            </Link>
                            <button className={`${styles.status} ${styles.approve}`} title='Release'> <MdVerified /></button>
                            <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={styles.title}>
                            dasdsadsadsadsadasdasdasdsjahgdhjasgdjhasgdjhasgdjhasgdjhasgdjhasgdjhasdjhg
                        </div>
                    </td>
                    <td>Siêu nhân 3 chân</td>
                    <td>DD.MM.YYYY</td>
                    <td>Life</td>
                    <td><span className={`${styles.status} ${styles.reported}`}>Reported</span></td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href='/dashboard/ideas/id'>
                                <button className={`${styles.status} ${styles.view}`} title='View'><MdVisibility />
                                </button>
                            </Link>
                            <button className={`${styles.status} ${styles.approve}`} title='Release' disabled> <MdVerified /></button>
                            <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                            </button>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
        <Pagination />
    </div>);
}

export default IdeaPage;