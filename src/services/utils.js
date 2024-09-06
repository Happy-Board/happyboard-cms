import { axiosInstance } from "../configs/axios.config";

//Get API
export const getAPIUsers = async (page, MAX_ITEM, uid) => {
  let result = null;
  await axiosInstance
    .get(`/users?page=${page}&limit=${MAX_ITEM}`, page, uid)
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(`Loi`);
      } else {
        result = res.data.data;
      }
    })
    .catch((error) => console.log(error));
  return result;
};
export const getAPIUsersOnline = async (uid) => {
  let result = null;
  await axiosInstance
    .get(`/users/latest-online`, uid)
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(`Loi`);
      } else {
        result = res.data.data;
      }
    })
    .catch((error) => console.log(error));
  return result;
};
export const getAPIUser = async (userId, uid) => {
  let result = null;
  await axiosInstance
    .get(`/users/${userId}`, uid)
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(`Loi`);
      } else {
        result = res.data.data;
      }
    })
    .catch((error) => console.log(error));
  return result;
};
export const getAPIIdeas = async (page, uid) => {
  let result = null;
  await axiosInstance
    .get(`/ideas/all?page=${page}&limit=8`, page, uid)
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(`Loi`);
      } else {
        result = res.data.data;
      }
    })
    .catch((error) => console.log(error));
  return result;
};
export const getAPIIdea = async (ideaId, uid) => {
  let result = null;
  await axiosInstance
    .get(`/ideas/${ideaId}`, uid)
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(`Loi`);
      } else {
        result = res.data.data;
      }
    })
    .catch((err) => console.log(err));
  return result;
};
export const getAPICategories = async (uid) => {
  try {
    const res = await axiosInstance.get(`/categories`, uid);
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAPIViewsByDay = async (uid) => {
  try {
    const res = await axiosInstance.get("/googleanalytics/views", uid);
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAPIEventsByDay = async (uid) => {
  try {
    const res = await axiosInstance.get("/googleanalytics/events", uid);
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API Error");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
//POST API
export const postAPIUnpublishIdea = async (ideaId, uid) => {
  await axiosInstance.post(`ideas/${ideaId}/unpublish`, uid).then((res) => {
    if (res.data.status !== 200) {
      console.log(`Loi`);
    } else {
      return res.data.data;
    }
  });
};
export const postAPIPublishIdea = async (ideaId, uid) => {
  await axiosInstance.post(`ideas/${ideaId}/publish`, uid).then((res) => {
    if (res.data.status !== 200) {
      console.log(`Loi`);
    } else {
      return res.data.data;
    }
  });
};
export const postAPICreateCat = async (catTitle, catDesc, catIcon, uid) => {
  try {
    const res = await axiosInstance.post(
      "/categories",
      {
        title: catTitle,
        description: catDesc,
        icon: catIcon,
      },
      {
        headers: { Authorization: `Bearer ${uid}` },
      }
    );
    if (res.data.status !== 201) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

//PUT API
export const putAPIActiveUser = async (userId, uid) => {
  try {
    const res = await axiosInstance.put(
      `users/${userId}/status`,
      {
        status: "active",
      },
      {
        headers: { Authorization: `Bearer ${uid}` },
      }
    );
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.message === "Change status user successfully";
  } catch (error) {
    console.error("Error activating user:", error);
    throw error;
  }
};
export const putAPIBanUser = async (userId, uid) => {
  try {
    const res = await axiosInstance.put(
      `users/${userId}/status`,
      {
        userId,
        status: "block",
      },
      {
        headers: { Authorization: `Bearer ${uid}` },
      }
    );
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.message === "Change status user successfully";
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }
};
export const putAPIUdpdateCat = async (catId, catTitle, catIcon, uid) => {
  try {
    const res = await axiosInstance.put(
      `/categories/${catId}`,
      {
        title: catTitle,
        icon: catIcon,
      },
      {
        headers: { Authorization: `Bearer ${uid}` },
      }
    );
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.data;
  } catch (err) {
    throw err;
  }
};
export const putAPIUpdateRole = async (userId, roleId, uid) => {
  try {
    const res = await axiosInstance.put(
      `/users/${userId}/role`,
      {
        roleId,
      },
      {
        headers: { Authorization: `Bearer ${uid}` },
      }
    );
    if (res.data.data !== 200) {
      console.log(res.data.message || "API error");
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
};

//DEL API
export const delAPIDeleteCat = async (catId, uid) => {
  try {
    const res = await axiosInstance.delete(`/categories/${catId}`, uid);
    if (res.data.status !== 200) {
      console.log(res.data.message || "API error");
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
};
