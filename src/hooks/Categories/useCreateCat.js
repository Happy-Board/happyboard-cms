import { useState } from "react";

import useAuth from "./src/lib/auth";
import { postAPICreateCat } from "./src/services/utils";

export const useCreateCat = () => {
  const { uid, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState();

  const loadCreate = async (catTitle, catDesc, catIcon) => {
    if (isAuthenticated && uid) {
      setLoading(true);
    }
    try {
      const takeNewCat = await postAPICreateCat(
        catTitle,
        catDesc,
        `fa-${catIcon}`,
        uid
      );
      setNewCat(takeNewCat);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, newCat, loadCreate };
};
