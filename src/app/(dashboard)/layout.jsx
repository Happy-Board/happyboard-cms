import styles from "./src/styles/dashboard.module.css";
import Navbar from "./src/components/navbar";
import Sidebar from "./src/components/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment-timezone";

const Layout = ({ children }) => {


  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        <main>{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Layout;
