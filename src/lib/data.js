import { getAPIUsers, getAPIIdeas, getAPIUser, getAPICategories } from '@/services/utils'

export const fetchUsers = async (userId, q, page) => {
    try {
        const User = await getAPIUsers(page, userId);
        const count = User.total;
        const users = User.users;
        return { users, count };
    } catch (err) {
        console.log(err);
    }
};
export const fetchIdeas = async (userId, q, page) => {
    try {
        const Ideas = await getAPIIdeas(page, userId);
        const count = Ideas.total;
        const ideas = Ideas.ideas;
        return { ideas, count };
    } catch (err) {
        console.log(err);
    }
};
export const fetchIdea = async (page, userId) => {
    try {
        const ideas = await getAPIIdeas(page, userId);
        return { ideas }
    } catch (err) {
        console.log(err);
    }
};
export const fetchUser = async (userId, uid) => {
    try {
        const user = await getAPIUser(userId, uid);
        return user;
    } catch (err) {
        console.log(err);
    }
}
export const fetchCats = async (uid) => {
    try {
        const res = await getAPICategories(uid);
        const cats = res.categories;
        const count = res.total;
        return { cats, count }
    } catch (err) {
        console.log(err);
    }
}