import useAuth from '@/lib/auth';
import { fetchCats } from '@/lib/data';
import { useEffect, useState } from 'react';


export const useCatsData = () => {
    const { uid, isAuthenticated } = useAuth();
    const [cats, setCats] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadCats = async () => {
            if (isAuthenticated && uid) {
                const { cats: fetchCatsData, count: fetchedCount } = await fetchCats(uid);
                setCats(fetchCatsData);
                setCount(fetchedCount);
            }
            setLoading(false);
        };

        loadCats();
    }, [isAuthenticated, uid]);

    return { cats, count, loading };
}
