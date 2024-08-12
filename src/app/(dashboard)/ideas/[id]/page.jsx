'use client'

import { useIdeaData } from '@/hooks/useIdeasData';
import styles from '@/styles/singleIdea.module.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';



const SigleIdeaPage = () => {
    const  ideaId = useParams();

    const { title, content, author, loading } = useIdeaData(ideaId.id);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.author}>{author}</p>
                <p className={styles.content}>{content}</p>
                <Link href='../ideas' className={styles.buttons}>
                    <div className={styles.buttonContainer}>
                        <button title='Release' > Release</button>
                        <button style={{ backgroundColor: 'crimson' }} title='Delete'>Delete</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SigleIdeaPage;