import { useState, useEffect } from 'react';
import useAuth from '@/lib/auth';
import { fetchUsers, fetchUser } from '@/lib/data';

export const useUsersData = (q, page) => {
    const { uid, isAuthenticated } = useAuth();
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            if (isAuthenticated && uid) {
                const { users, count } = await fetchUsers(uid, q, page);
                setUsers(users);
                setCount(count);
            }
            setLoading(false);
        };

        loadUsers();
    }, [uid]);

    return { users, count, loading };
};

export const useUserData = (userId) => {
    const { uid, isAuthenticated } = useAuth();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (isAuthenticated && uid) {
                const user = await fetchUser(userId, uid);
                setUser(user);
            }
            setLoading(false);
        };

        loadUser();
    }, [uid, isAuthenticated, userId]);

    return { user, loading };
};