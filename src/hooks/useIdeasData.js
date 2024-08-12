import { useState, useEffect } from 'react';
import useAuth from '@/lib/auth';
import { fetchIdeas, fetchIdea } from '@/lib/data';


// const { userId, isAuthenticated } = useAuth();

export const useIdeasData = (q, page) => {
    const { userId, isAuthenticated } = useAuth();
    const [ideas, setIdeas] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadIdeas = async () => {
            if (isAuthenticated && userId) {
                const { ideas: fetchedIdeas, count: fetchedCount } = await fetchIdeas(userId, q, page);
                setIdeas(fetchedIdeas);
                setCount(fetchedCount);
            }
            setLoading(false);
        };

        loadIdeas();
    }, [userId, isAuthenticated, q, page]);

    return { ideas, count, loading };
};


export const useIdeaData = (ideaId) => {
    const { userId, isAuthenticated } = useAuth();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [author, setAuthor] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadIdea = async () => {
            if (isAuthenticated && userId) {
                const { title: fetchedTitle, content: fetchedContent, author: fetchAuthor } = await fetchIdea(ideaId, userId);
                setTitle(fetchedTitle);
                setContent(fetchedContent);
                setAuthor(fetchAuthor);
            }
            setLoading(false);
        };

        loadIdea();
    }, [userId, isAuthenticated, ideaId]);

    return { title, content, author, loading };

}

