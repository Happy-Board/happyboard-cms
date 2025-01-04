import { useState, useEffect } from "react";
import useAuth from "@/lib/auth";
import { putAPIActiveUser, postAPIPublishIdea } from "@/services/utils";

export const usePublishIdea = () => {
  const { uid, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const publishIdea = async (ideaId) => {
    if (isAuthenticated && uid) {
      setLoading(true);
      try {
        const res = await postAPIPublishIdea(ideaId, uid);
        setIsSuccess(res);
      } catch (error) {
        console.error("Failed to unpublish idea:", error);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return { loading, isSuccess, publishIdea };
};

export const useActiveUser = () => {
  const { uid, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeUser = async (userId) => {
    if (isAuthenticated && uid) {
      setLoading(true);
      try {
        const success = await putAPIActiveUser(userId, uid);
        setIsSuccess(success);
      } catch (err) {
        console.error(err);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return { loading, isSuccess, activeUser };
};
