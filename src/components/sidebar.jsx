'use client'

import styles from "../styles/sidebar.module.css";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdLogout,
    MdArticle,
    MdVerticalSplit,
} from "react-icons/md";
import Image from 'next/image'
import MenuLink from "./ui/menu-link";
import useAuth from "../lib/auth";
import { useRouter } from "next/navigation";

const menuItems = [{
    title: "Pages",
    list: [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />,
        },
        {
            title: "Users",
            path: "/users",
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
// {
//     title: "Analytics",
//     list: [
//         {
//             title: "Revenue",
//             path: "/dashboard/revenue",
//             icon: <MdWork />,
//         },
//         {
//             title: "Reports",
//             path: "/dashboard/reports",
//             icon: <MdAnalytics />,
//         },
//         {
//             title: "Teams",
//             path: "/dashboard/teams",
//             icon: <MdPeople />,
//         },
//     ]
// },
{
    title: "User",
    list: [
        // {
        //     title: "Settings",
        //     path: "/dashboard/settings",
        //     icon: <MdOutlineSettings />,
        // },
        // {
        //     title: "Help",
        //     path: "/dashboard/help",
        //     icon: <MdHelpCenter />,
        // },
    ]
}
];

const Sidebar = () => {
    
    const { logout } = useAuth();

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src='/User_icon_2.svg.png' alt="" width="50" height="50" />
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
            <div className={styles.logout} onClick={logout}>
                <MdLogout />
                Logout
            </div>
        </div>
    );
};

export default Sidebar;