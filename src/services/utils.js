
import { axiosInstance } from '../configs/axios.config';

export const getAPIUsers = async (page, uid) => {
    let result = null
    await axiosInstance.get(`/users?page=${page}`, page, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`)
            } else {
                result = res.data.data
            }
        })
        .catch(error => console.log(error));
    return result
}
export const getAPIUser = async (userId, uid) => {
    let result = null;
    await axiosInstance.get(`/users/${userId}`, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`)
            } else {
                result = res.data.data
            }
        }).catch(error => console.log(error));
    return result
}
export const getAPIIdeas = async (page, uid) => {
    let result = null
    await axiosInstance.get(`/ideas/all?page=${page}&limit=10`, page, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`)
            } else {
                result = res.data.data;
            }
        })
        .catch(error => console.log(error));
    return result;
}
export const getAPIIdea = async (ideaId, uid) => {
    let result = null;
    await axiosInstance.get(`/ideas/${ideaId}`, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`);
            } else {
                result = res.data.data;
            }
        })
        .catch(err => console.log(err));
    return result;
}
export const postAPIUnpublishIdea = async (ideaId, uid) => {
    await axiosInstance.post(`ideas/${ideaId}/unpublish`, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`);
            } else {
                return res.data.data;
            }
        })
}
export const postAPIPublishIdea = async (ideaId, uid) => {
    await axiosInstance.post(`ideas/${ideaId}/publish`, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`);
            } else {
                return res.data.data;
            }
        })
}
export const putAPIActiveUser = async (userId, uid) => {
    try {
        const res = await axiosInstance.put(`users/${userId}/status`, {
            status: 'active'
        }, {
            headers: { Authorization: `Bearer ${uid}` }
        });
        if (res.data.status !== 200) {
            throw new Error(res.data.message || 'API error');
        }
        return res.data.message === "Change status user successfully";
    } catch (error) {
        console.error('Error activating user:', error);
        throw error;
    }
}
export const putAPIBanUser = async (userId, uid) => {
    try {
        const res = await axiosInstance.put(`users/${userId}/status`, {
            userId,
            status: 'block'
        }, {
            headers: { Authorization: `Bearer ${uid}` }
        });
        if (res.data.status !== 200) {
            throw new Error(res.data.message || 'API error');
        }
        return res.data.message === "Change status user successfully";
    } catch (error) {
        console.error('Error banning user:', error);
        throw error;
    }
}
export const getAPICategories = async (uid) => {
    try {
        const res = await axiosInstance.get(`/categories`,uid);
        if (res.data.status !== 200) {
            throw new Error(res.data.message || 'API error');
        }
        return res.data.data

    }catch(err) {
        console.log(err);
    }
}

