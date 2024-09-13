"use client";
import { usePathname } from "next/navigation";
import styles from "./src/styles/navbar.module.css";
import { MdLogout } from "react-icons/md";
import useAuth from "./src/lib/auth";
import { useTheme } from "./src/app/context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pathname.split("/").at(1)} {pathname.split("/").at(2)}
      </div>
      <div className={styles.menu}>
        <div className={styles.toggleswitch}>
          <label>
            <input
              type="checkbox"
              checked={theme === "light"}
              onChange={toggleTheme}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.logout} title="Logout" onClick={logout}>
          <MdLogout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
