'use client'
import { usePathname } from 'next/navigation';
import styles from '@/styles/navbar.module.css'
import { MdLogout, MdPublic, MdSearch } from 'react-icons/md';
import useAuth from '@/lib/auth';

const Navbar = () => {

    const pathname = usePathname();
    const { logout } = useAuth();

    return (<div className={styles.container}>
        <div className={styles.title}>
            {pathname.split("/").pop()}
        </div>
        <div className={styles.menu}>
            <div className={styles.icons} title='Change Theme'>
                <MdPublic size={20} />
            </div>
            <div className={styles.logout} title='Logout' onClick={logout}>
                <MdLogout />
                {/* Logout */}
            </div>
        </div>
    </div>);
}

export default Navbar;