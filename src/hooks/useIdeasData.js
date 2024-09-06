import { useState, useEffect } from "react";
import useAuth from "@/lib/auth";
import { fetchIdeas, fetchIdea } from "@/lib/data";

export const useIdeasData = (MAX_ITEM, page) => {
  const { uid, isAuthenticated } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIdeas = async () => {
      if (isAuthenticated && uid) {
        const { ideas: fetchedIdeas, count: fetchedCount } = await fetchIdeas(
          uid,
          MAX_ITEM,
          page
        );
        setIdeas(fetchedIdeas);
        setCount(fetchedCount);
      }
      setLoading(false);
    };

    loadIdeas();
  }, [uid, isAuthenticated, MAX_ITEM, page]);

  return { ideas, count, loading };
};

export const useIdeaData = (page, ideaId) => {
  const { uid, isAuthenticated } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIdea = async () => {
      if (isAuthenticated && uid) {
        const { ideas: takeIdea } = await fetchIdea(page, uid);
        setIdeas(takeIdea.ideas);
      }
      setLoading(false);
    };

    loadIdea();
  }, [uid, isAuthenticated, page, ideaId]);

  return { ideas, loading };
};
