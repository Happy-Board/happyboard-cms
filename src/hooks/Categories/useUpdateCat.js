import { useState } from "react";

import useAuth from "./src/lib/auth";
import { putAPIUdpdateCat } from "./src/services/utils";

export const useUpdateCat = () => {
  const { uid, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const loadUpdate = async (catId, catTitle, catIcon) => {
    if (isAuthenticated && uid) {
      setLoading(true);
    }
    try {
      const success = await putAPIUdpdateCat(
        catId,
        catTitle,
        `fa-${catIcon}`,
        uid
      );
      setIsSuccess(success);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  return { loading, isSuccess, loadUpdate };
};
