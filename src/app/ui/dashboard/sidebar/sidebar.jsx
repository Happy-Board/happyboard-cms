import styles from "./sidebar.module.css";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdLogout,
    MdArticle,
    MdVerticalSplit,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink"
import Image from 'next/image'

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
            path: "/dashboard/users",
            icon: <MdSupervisedUserCircle />,
        },
        {
            title: "Ideas",
            path: "/dashboard/ideas",
            icon: <MdArticle />,
        },
        {
            title: "Categories",
            path: "/dashboard/categories",
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
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src='/User_icon_2.svg.png' alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Astersa</span>
                    <span className={styles.userTitle}>Admin</span>
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
            <div className={styles.logout}>
                <MdLogout />
                Logout
            </div>
        </div>
    );
};

export default Sidebar;