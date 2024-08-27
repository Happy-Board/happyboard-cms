'use client'

import styles from "../styles/sidebar.module.css";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdArticle,
    MdVerticalSplit,
} from "react-icons/md";
import MenuLink from "./ui/menu-link";

const menuItems = [{
    title: "Pages",
    list: [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />,
        },
        {
            title: "Members",
            path: "/members",
            icon: <MdSupervisedUserCircle />,
        },
        {
            title: "Ideas",
            path: "/ideas",
            icon: <MdArticle />,
        },
        {
            title: "Categories",
            path: "/categories",
            icon: <MdVerticalSplit />,
        },
    ],
},
];

const Sidebar = () => {
    
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <img className={styles.userImage} src='/logo.png' alt="" width="70" height="70" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Administrator</span>
                    <span className={styles.userTitle}>Super-Admin</span>
                </div>
            </div>
            
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map(item => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;