import { axiosInstance } from "@/configs/axios.config";

export const getAPISearchUserByNameAndEmail = async (keyword, uid) => {
  try {
    const res = await axiosInstance.get(
      `/users?keyword=${keyword}&orderBy=DESC&sortBy=id`,
      uid
    );
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAPISearchIdea = async (keyword, uid) => {
  try {
    const res = await axiosInstance.get(`/ideas?keyword=${keyword}`, uid);
    if (res.data.status !== 200) {
      throw new Error(res.data.message || "API error");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
