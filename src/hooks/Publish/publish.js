import { useState, useEffect } from 'react';
import useAuth from '@/lib/auth';
import { getAPIPublishIdea } from '@/services/utils';

export const usePublishIdea = () => {
    const { userId, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const publishIdea = async (ideaId) => {
        if (isAuthenticated && userId) {
            setLoading(true);
            try {
                const res = await getAPIPublishIdea(ideaId, userId);
                setIsSuccess(res);
            } catch (error) {
                console.error('Failed to unpublish idea:', error);
                setIsSuccess(false);
            } finally {
                setLoading(false);
            }
        }
    };


    return { loading, isSuccess, publishIdea }
};