"use client";
import Search from "@/components/ui/search";
import Pagination from "@/components/pagination";
import { useIdeasData } from "@/hooks/useIdeasData";
import styles from "@/styles/idea.module.css";
import { useUnpublishIdea } from "@/hooks/Publish/unPublish";
import { usePublishIdea } from "@/hooks/Publish/publish";
import IdeaRow from "@/components/ui/idea";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";

const IdeaPage = ({ searchParams }) => {
  const MAX_ITEM = 8;
  const page = searchParams?.page || 1;

  const { ideas: initialIdeas, count } = useIdeasData(MAX_ITEM, page);

  const { unpublishIdea } = useUnpublishIdea();
  const { publishIdea } = usePublishIdea();

  const handleUnpublish = async (id) => {
    try {
      await unpublishIdea(id);
    } catch (error) {
      console.error("Failed to unpublish idea:", error);
    }
  };
  const handlePublish = async (id) => {
    try {
      await publishIdea(id);
    } catch (error) {
      console.error("Failed to publish idea:", error);
    }
  };

  const SkeletonRow = () => (
    <tr>
      <td>
        <Skeleton width="170px" height="40px" />
      </td>
      <td>
        <Skeleton width="170px" height="20px" />
      </td>
      <td>
        <Skeleton width="150px" height="20px" />
      </td>
      <td>
        <Skeleton width="100px" height="20px" />
      </td>
      <td>
        <Skeleton width="100px" height="20px" />
      </td>
      <td>
        <Skeleton width="100px" height="20px" />
      </td>
      <td>
        <Skeleton width="150px" height="40px" />
      </td>
    </tr>
  );

  const renderContent = () => {
    if (initialIdeas.length === 0) {
      return Array(MAX_ITEM)
        .fill()
        .map((_, index) => <SkeletonRow key={index} />);
    }
    return initialIdeas.map((idea) => (
      <IdeaRow
        key={idea.id}
        idea={idea}
        page={page}
        handlePublish={handlePublish}
        handleUnpublish={handleUnpublish}
      />
    ));
  };

  return (
    <Suspense>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Title</td>
              <td>Author</td>
              <td>Requested Date</td>
              <td>Released Date</td>
              <td>Category</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{renderContent()}</tbody>
        </table>
        <Pagination count={count} />
      </div>
    </Suspense>
  );
};

export default IdeaPage;
