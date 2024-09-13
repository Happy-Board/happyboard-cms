"use client";
import Search from "./src/components/ui/search";
import Pagination from "./src/components/pagination";
import styles from "./src/styles/idea.module.css";
import { useUnpublishIdea } from "./src/hooks/Publish/unPublish";
import { usePublishIdea } from "./src/hooks/Publish/publish";
import IdeaRow from "./src/components/ui/idea";
import { Suspense, useEffect, useRef, useState } from "react";
import Skeleton from "./src/component./skeleton";
import Filter from "./src/components/ui/filter";
import useAuth from "./src/lib/auth";
import { fetchIdeas } from "./src/lib/data";
import getAPISearchIdea from "./src/services/search";

const IdeaPage = ({ searchParams }) => {
  const [ideas, setIdeas] = useState([]);
  const [count, setCount] = useState();
  const intervalRef = useRef(null);

  const { uid, isAuthenticated } = useAuth();

  const MAX_ITEM = 7;
  const page = searchParams?.page || 1;
  const keyword = searchParams?.keyword || "";

  const loadIdeas = async () => {
    if (isAuthenticated && uid) {
      if (keyword) {
        const searchResults = await x(
          keyword,
          uid
        );
        setUsers(searchResults.ideas);
        setCount(searchResults.total);
      } else {
        const { ideas, count } = await fetchIdeas(uid, MAX_ITEM, page);
        setIdeas(ideas);
        setCount(count);
      }
    }
  };
  useEffect(() => {
    loadIdeas();

    intervalRef.current = setInterval(() => {
      loadIdeas();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid, page, keyword]);

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
    if (ideas.length === 0) {
      return Array(MAX_ITEM)
        .fill()
        .map((_, index) => <SkeletonRow key={index} />);
    }
    return ideas.map((idea) => (
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
          <Filter filterOptions={["Pending", "Released"]} />
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
