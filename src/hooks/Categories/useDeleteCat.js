import { useState } from "react";

import useAuth from "@/lib/auth";
import { delAPIDeleteCat } from "@/services/utils";

export const useDeleteCat = () => {
  const { uid, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState();

  const loadDelete = async (catId) => {
    if (isAuthenticated && uid) {
      setLoading(true);
    }
    try {
      const delCat = await delAPIDeleteCat(catId, uid);
      setIsSuccess(delCat);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  return { loading, isSuccess, loadDelete };
};
