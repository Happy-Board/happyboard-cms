import { useState, useEffect } from 'react';
import useAuth from '@/lib/auth';
import { fetchUsers } from '@/lib/data';

export const useUsersData = (q, page) => {
    const { userId, isAuthenticated } = useAuth();
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            if (isAuthenticated && userId) {
                // const { users: fetchedUsers, count: fetchedCount } = await fetchUsers(userId);
                const { users: fetchedUsers, count: fetchedCount } = await fetchUsers(userId, q, page);
                setUsers(fetchedUsers);
                setCount(fetchedCount);
            }
            setLoading(false);
        };

        loadUsers();
    // }, [userId, isAuthenticated, q, page]);
    }, [userId, isAuthenticated]);

    return { users, count, loading };
};