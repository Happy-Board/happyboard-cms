import { useState, useEffect } from 'react';
import useAuth from '@/lib/auth';
import { getAPIActiveUser, getAPIBanUser, getAPIUnpublishIdea } from '@/services/utils';

export const useUnpublishIdea = () => {
    const { uid, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const unpublishIdea = async (ideaId) => {
        if (isAuthenticated && uid) {
            setLoading(true);
            try {
                const res = await getAPIUnpublishIdea(ideaId, uid);
                setIsSuccess(res);
            } catch (error) {
                console.error('Failed to unpublish idea:', error);
                setIsSuccess(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return { loading, isSuccess, unpublishIdea }
};

// export const useBanUser = () => {
//     const { uid, isAuthenticated } = useAuth();
//     const [loading, setLoading] = useState(true);
//     const [isSuccess, setIsSuccess] = useState(false);

//     const banUser = async (userId) => {
//         if (isAuthenticated && userId) {
//             setLoading(true);
//             try {
//                 const res = await getAPIBanUser(userId, uid);
//                 setIsSuccess(res);
//             } catch (err) {
//                 console.log(err);
//                 setIsSuccess(false);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return { loading, isSuccess, banUser }
// }
export const useBanUser = () => {
    const { uid, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const banUser = async (userId) => {
        if (isAuthenticated && userId) {
            setLoading(true);
            try {
                const success = await getAPIBanUser(userId, uid);
                setIsSuccess(success);
            } catch (err) {
                console.error(err);
                setIsSuccess(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return { loading, isSuccess, banUser }
}