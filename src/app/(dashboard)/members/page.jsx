"use client";

import styles from "@/styles/members.module.css";
import Pagination from "@/components/pagination";
import { useActiveUser } from "@/hooks/Publish/publish";
import { useBanUser } from "@/hooks/Publish/unPublish";
import { Suspense, useEffect, useRef, useState } from "react";
import { UserRow } from "@/components/ui/member";
import Search from "@/components/ui/search";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "@/components/Skeleton";
import Filter from "@/components/ui/filter";
import { getAPISearchUserByNameAndEmail } from "@/services/search";
import useAuth from "@/lib/auth";
import { fetchUsers } from "@/lib/data";

const UsersPage = ({ searchParams }) => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState([]);
  const intervalRef = useRef(null);

  const { uid, isAuthenticated } = useAuth();

  const MAX_ITEM = 7;
  const page = searchParams?.page || 1;
  const keyword = searchParams?.keyword || "";

  const loadUsers = async () => {
    if (isAuthenticated && uid) {
      if (keyword) {
        const searchResults = await getAPISearchUserByNameAndEmail(keyword, uid);
        setUsers(searchResults.users)
        setCount(searchResults.total)
      } else {
        const { users, count } = await fetchUsers(uid, MAX_ITEM, page);
        setUsers(users);
        setCount(count);
      }
    }
  };
  useEffect(() => {
    loadUsers();

    intervalRef.current = setInterval(() => {
      loadUsers();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid, page, keyword]);

  const { activeUser } = useActiveUser();
  const { banUser } = useBanUser();

  const handleActive = async (id) => {
    try {
      await activeUser(id);
      if (isSuccess) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: "active" } : user
          )
        );
      } else {
        console.error("Failed to activate user");
      }
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const handleBan = async (id) => {
    try {
      await banUser(id);
      if (isSuccess) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: "block" } : user
          )
        );
      } else {
        console.error("Failed to ban user");
      }
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const SkeletonRow = () => (
    <tr>
      <td>
        <Skeleton width="170px" height="40px" />
      </td>
      <td>
        <Skeleton width="170px" height="20px" />
      </td>
      <td>
        <Skeleton width="150px" height="20px" />
      </td>
      <td>
        <Skeleton width="100px" height="20px" />
      </td>
      <td>
        <Skeleton width="100px" height="20px" />
      </td>
      <td>
        <Skeleton width="150px" height="40px" />
      </td>
    </tr>
  );
  const renderContent = () => {
    if (users.length === 0) {
      return Array(MAX_ITEM)
        .fill()
        .map((_, index) => <SkeletonRow key={index} />);
    }
    return users.map((user) => (
      <UserRow
        key={user.email}
        user={user}
        page={page}
        handleActive={handleActive}
        handleBan={handleBan}
      />
    ));
  };
  return (
    <Suspense>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search />
          <Filter filterOptions={["User", "Admin", "Super-Admin"]} />
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
          <tbody>{renderContent()}</tbody>
        </table>
        <Pagination count={count} />
      </div>
    </Suspense>
  );
};

export default UsersPage;
