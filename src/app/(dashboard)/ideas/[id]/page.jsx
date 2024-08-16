'use client'

import { useIdeaData } from '@/hooks/useIdeasData';
import styles from '@/styles/singleIdea.module.css';
import { useParams, useRouter, useSearchParams, } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUnpublishIdea } from '@/hooks/Publish/unPublish';
import { usePublishIdea } from '@/hooks/Publish/publish';



const SigleIdeaPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const ideaId = params.id;
    const page = searchParams.get('page');
    const { ideas, loading } = useIdeaData(page, ideaId);
    const [idea, setIdea] = useState(null);

    const { unpublishIdea } = useUnpublishIdea();
    const { publishIdea } = usePublishIdea();

    useEffect(() => {

        if (!loading && ideas.length > 0) {
            const foundIdea = ideas.find(ideaInfo => ideaInfo.id == ideaId);
            setIdea(foundIdea);
        }
    }, [ideas, loading, ideaId]);


    if (!idea) { return <div className={styles.container}><div className={styles.formContainer} /></div> }

    const handleAction = async (action, id) => {
        try {
            if (action === 'publish') {
                await publishIdea(id);
            } else if (action === 'unpublish') {
                await unpublishIdea(id);
            }

            router.push('/ideas');
        } catch (error) {
            console.error(`Failed to ${action} idea:`, error);
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h3 className={styles.title}>{idea.title}</h3>
                <span className={`status ${idea.isPublished ? styles.released : styles.pending}`}>
                    {idea.isPublished ? 'Released' : 'Pending'}
                </span>
                <p className={styles.author}>{idea.author}</p>
                <p className={styles.content}>{idea.content}</p>
                <div className={styles.buttonContainer}>
                    <button
                        className={`status ${styles.approve}`}
                        title='Release'
                        onClick={() => handleAction('publish', idea.id)}
                        disabled={idea.isPublished === true}
                    > Release</button>
                    <button
                        className={`status ${styles.unpublish}`}
                        title='Unpublish'
                        onClick={() => handleAction('unpublish', idea.id)}
                        disabled={idea.isPublished === false}
                    >Unpublish</button>
                </div>
            </div>
        </div>
    );
}

export default SigleIdeaPage;