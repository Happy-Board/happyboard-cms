import { getAPIUsers, getAPIIdeas, getAPIUser, getAPICategories } from '@/services/utils'

export const fetchUsers = async (userId, q, page) => {
    try {
        let User = await getAPIUsers(page,q, userId);
        let count = User.total;
        let users = User.users;
        return { users, count };
    } catch (err) {
        console.log(err);
    }
};
export const fetchIdeas = async (userId, q, page) => {
    try {
        let Ideas = await getAPIIdeas(page, userId);
        let count = Ideas.total;
        let ideas = Ideas.ideas;
        return { ideas, count };
    } catch (err) {
        console.log(err);
    }
};
export const fetchIdea = async (page, userId) => {
    try {
        let ideas = await getAPIIdeas(page, userId);
        return { ideas }
    } catch (err) {
        console.log(err);
    }
};
export const fetchUser = async (userId, uid) => {
    try {
        let user = await getAPIUser(userId, uid);
        return user;
    } catch (err) {
        console.log(err);
    }
}
export const fetchCats = async (uid) => {
    try {
        let res = await getAPICategories(uid);
        let cats = res.categories;
        let count = res.total;
        return { cats, count }
    } catch (err) {
        console.log(err);
    }
}