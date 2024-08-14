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

const IdeaPage = ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const { ideas: initialIdeas, count, loading } = useIdeasData(q, page);

    const { unpublishIdea } = useUnpublishIdea();
    const { publishIdea } = usePublishIdea();

    if (loading) return <div><div className={styles.container} >
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
        </table>
        <Pagination count={count} />
    </div>

    </div>;

    const handleUnpublish = async (id) => {
        try {
            await unpublishIdea(id);
        } catch (error) {
            console.error('Failed to unpublish idea:', error);
        }
    }
    const handlePublish = async (id) => {
        try {
            await publishIdea(id);

        } catch (error) {
            console.error('Failed to publish idea:', error);
        }
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
                                    <Link href={`/ideas/${idea.id}?page=${page}`}>
                                        <button className={`status ${styles.view}`} title='View'><MdVisibility /></button>
                                    </Link>
                                    <button className={`status ${styles.approve}`}
                                        title='Release'
                                        disabled={idea.isPublished}
                                        onClick={() => {
                                            handlePublish(idea.id)
                                            window.location.reload();
                                        }}>
                                        <MdVerified />
                                    </button>
                                    <button className={`status ${styles.unpublish}`}
                                        title='Unpublish'
                                        onClick={() => {
                                            handleUnpublish(idea.id)
                                            window.location.reload();
                                        }}
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