import {
  getAPIUsers,
  getAPIIdeas,
  getAPIUser,
  getAPICategories,
  getAPIViewsByDay,
  getAPIEventsByDay,
  getAPIUsersOnline,
  getAPINewUsersByDay,
  getAPINewIdeasByDay,
} from "@/services/utils";

export const fetchUsers = async (uid, MAX_ITEM, page) => {
  try {
    let User = await getAPIUsers(page, MAX_ITEM, uid);
    let count = User.total;
    let users = User.users;
    return { users, count };
  } catch (err) {
    console.log(err);
  }
};
export const fetchUsersOnline = async (uid) => {
  try {
    let User = await getAPIUsersOnline(uid);
    let users = User;
    return { users };
  } catch (err) {
    console.log(err);
  }
};
export const fetchIdeas = async (userId, MAX_ITEM, page) => {
  try {
    let Ideas = await getAPIIdeas(page, MAX_ITEM, userId);
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
    return { ideas };
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
};
export const fetchCats = async (uid) => {
  try {
    let res = await getAPICategories(uid);
    let cats = res.categories;
    let count = res.total;
    return { cats, count };
  } catch (err) {
    console.log(err);
  }
};
export const fetchViewsByDay = async (uid) => {
  try {
    let res = await getAPIViewsByDay(uid);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const fetchNewUsersByDay = async (uid) => {
  try {
    let res = await getAPINewUsersByDay(uid);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const fetchEventsByDay = async (uid) => {
  try {
    let res = await getAPIEventsByDay(uid);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const fetchNewIdeasByDay = async (uid) => {
  try {
    let res = await getAPINewIdeasByDay(uid);
    return res;
  } catch (err) {
    console.log(err);
  }
};
