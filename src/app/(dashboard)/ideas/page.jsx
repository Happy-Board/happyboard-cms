'use client'

import Link from 'next/link';
import {
    MdBlock,
    MdVerified,
    MdVisibility,
} from 'react-icons/md';
import Search from "@/components/ui/search";
import Pagination from "@/components/pagination";
import { useIdeasData } from '@/hooks/useIdeasData';
import styles from '@/styles/idea.module.css';
import moment from 'moment-timezone';
import { useUnpublishIdea } from '@/hooks/Publish/unPublish';
import { usePublishIdea } from '@/hooks/Publish/publish';
import { useState } from 'react';




const IdeaPage = ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const { ideas: initialIdeas, count, loading } = useIdeasData(q, page);
    const [ideas, setIdeas] = useState(initialIdeas);


    const { unpublishIdea } = useUnpublishIdea();
    const { publishIdea } = usePublishIdea();

    if (loading) return <div>Loading...</div>;

    const handleUnpublish = async (id) => {
        await unpublishIdea(id);
        setIdeas(prevIdeas =>
            prevIdeas.map(idea =>
                idea.id === id ? { ...idea, isPublished: false } : idea
            )
        );
    }
    const handlePublish = async (id) => {
        await publishIdea(id);
        setIdeas(prevIdeas =>
            prevIdeas.map(idea =>
                idea.id === id ? { ...idea, isPublished: true } : idea
            )
        );
    }


    return (
        <div className={styles.container} >
            <div className={styles.top}>
                <Search />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Requested Date</td>
                        <td>Category</td>
                        <td>Status</td>
                        <td>Action</td>

                    </tr>
                </thead>
                <tbody>
                    {initialIdeas && initialIdeas.map((idea) => (
                        <tr key={idea.id}>
                            <td>
                                <div className={styles.title} >
                                    {idea.title}
                                </div>
                            </td>
                            <td>{idea.User.email}</td>
                            <td>{moment(idea.createdAt).format('MMMM Do YYYY')}</td>
                            <td>{idea.Category.title}</td>
                            <td >
                                <span className={`status ${idea.isPublished ? styles.released : styles.pending}`}>
                                    {idea.isPublished ? 'Released' : 'Pending'}
                                </span>
                            </td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/ideas/${idea.id}`}>
                                        <button className={`status ${styles.view}`} title='View'><MdVisibility /></button>
                                    </Link>
                                    <button className={`status ${styles.approve}`}
                                        title='Release'
                                        disabled={idea.isPublished}
                                        onClick={() => { handlePublish(idea.id) }}>
                                        <MdVerified />
                                    </button>
                                    <button className={`status ${styles.delete}`}
                                        title='Unpublish'
                                        onClick={() => { handleUnpublish(idea.id) }}
                                        disabled={!idea.isPublished}>
                                        <MdBlock />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
    );
}

export default IdeaPage;