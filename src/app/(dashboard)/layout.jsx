import styles from '@/styles/dashboard.module.css';
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
    return (<div className={styles.container}>
        <div className={styles.menu}>
            <Sidebar />
        </div>
        <div className={styles.content}>
            <Navbar />
            <main>{children}</main> 
            <ToastContainer/>
        </div>
    </div>
    );
}

export default Layout;