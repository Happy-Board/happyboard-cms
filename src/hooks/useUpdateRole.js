import useAuth from '@/lib/auth';
import { useState } from 'react';
import { putAPIUpdateRole } from '@/services/utils';

export const useUpdateRole = () => {
    const { uid, isAuthenticated } = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateRole = async (userId, roleId) => {
        if (uid && isAuthenticated) {
            setLoading(true);
        }
        try {
            const success = await putAPIUpdateRole(userId, roleId, uid);
            setIsSuccess(success);
        } catch (err) {
            console.log('Update Failed');
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    }
    return { isSuccess, updateRole, loading }
}