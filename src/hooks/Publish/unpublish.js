import { useState, useEffect } from 'react';
import useAuth from '@/lib/auth';
import { getAPIUnpublishIdea } from '@/services/utils';

export const useUnpublishIdea = () => {
    const { userId, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const unpublishIdea = async (ideaId) => {
        if (isAuthenticated && userId) {
            setLoading(true);
            try {
                const res = await getAPIUnpublishIdea(ideaId, userId);
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