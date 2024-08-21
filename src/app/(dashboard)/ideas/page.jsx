'use client'
import Search from "@/components/ui/search";
import Pagination from "@/components/pagination";
import { useIdeasData } from '@/hooks/useIdeasData';
import styles from '@/styles/idea.module.css';
import { useUnpublishIdea } from '@/hooks/Publish/unPublish';
import { usePublishIdea } from '@/hooks/Publish/publish';
import IdeaRow from '@/components/ui/idea';
import { Suspense } from "react";

const IdeaPage = ({ searchParams }) => {
    
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const { ideas: initialIdeas, count, loading } = useIdeasData(q, page);

    const { unpublishIdea } = useUnpublishIdea();
    const { publishIdea } = usePublishIdea();

    if (loading) return <div>
        <div className={styles.container} >
            <div className={styles.top}>
                <Search />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headtable}>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Requested Date</td>
                        <td>Category</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <Pagination />
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
        <Suspense>
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
                            <IdeaRow
                                key={idea.id}
                                idea={idea}
                                page={page}
                                handlePublish={handlePublish}
                                handleUnpublish={handleUnpublish}
                            />
                        ))}
                    </tbody>
                </table>
                <Pagination count={count} />
            </div>
        </Suspense>
    );
}

export default IdeaPage;