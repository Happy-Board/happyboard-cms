
import { axiosInstance } from '../configs/axios.config';

export const getAPIUsers = async (uid) => {
    let result = null
    await axiosInstance.get('/users', uid)
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
export const getAPIIdeas = async (page, uid) => {
    let result = null
    await axiosInstance.get(`/ideas/all?page=${page}`, page, uid)
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
export const getAPIUnpublishIdea = async (ideaId, uid) => {
    await axiosInstance.post(`ideas/${ideaId}/unpublish`, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`);
            } else {
                return res.data.data;
            }
        })
}
export const getAPIPublishIdea = async (ideaId, uid) => {
    await axiosInstance.post(`ideas/${ideaId}/publish`, uid)
        .then(res => {
            if (res.data.status !== 200) {
                console.log(`Loi`);
            } else {
                return res.data.data;
            }
        })
}
