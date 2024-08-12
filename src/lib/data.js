import { getAPIUsers, getAPIIdeas, getAPIIdea } from '@/services/utils'

// export const fetchUsers = async (userId) => {
export const fetchUsers = async (userId, q, page) => {
    try {
        const User = await getAPIUsers(userId);
        const users = User;
        const count = User.length;
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

export const fetchIdea = async (ideaId, uid) => {
    try {
        const idea = await getAPIIdea(ideaId, uid);
        const title = idea.title;
        const content = idea.content;
        const author = idea.User.username;

        return { title, content, author }
    } catch (err) {
        console.log(err);
    }
};
