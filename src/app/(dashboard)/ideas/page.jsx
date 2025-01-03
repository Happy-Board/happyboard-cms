"use client";
import Search from "@/components/ui/search";
import { Pagination } from "@/components/pagination";
import styles from "@/styles/idea.module.css";
import { useUnpublishIdea } from "../../../hooks/publish/unPublish";
import { usePublishIdea } from "../../../hooks/publish/publish";
import IdeaRow from "@/components/ui/idea";
import { Suspense, useEffect, useRef, useState } from "react";
import Skeleton from "@/components/loading";
import Filter from "@/components/ui/filter";
import useAuth from "@/lib/auth";
import { fetchIdeas } from "@/lib/data";
import getAPISearchIdea from "@/services/search";

const IdeaPage = ({ searchParams }) => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [count, setCount] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");

  const { uid, isAuthenticated } = useAuth();

  const MAX_ITEM = 7;
  const page = searchParams?.page || 1;
  const keyword = searchParams?.keyword || "";

  const loadIdeas = async () => {
    if (isAuthenticated && uid) {
      if (keyword) {
        const searchResults = await getAPISearchIdea(keyword, uid);
        filterIdeas(searchResults.ideas, selectedStatus);
        setCount(searchResults.total);
      } else {
        const { ideas, count } = await fetchIdeas(uid, MAX_ITEM, page);
        filterIdeas(ideas, selectedStatus);
        setCount(count);
      }
    }
  };

  const filterIdeas = (ideaList, status) => {
    setIdeas(ideaList);

    if (status) {
      const filtered = ideaList.filter((idea) =>
        status === "Pending" ? !idea.isPublished : idea.isPublished
      );
      setFilteredIdeas(filtered);
      setCount(filtered.length);
    } else {
      setFilteredIdeas(ideaList);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, [uid, page, keyword, selectedStatus]);

  const { unpublishIdea } = useUnpublishIdea();
  const { publishIdea } = usePublishIdea();

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
    filterIdeas(ideas, status);
  };

  const handleUnpublish = async (id) => {
    try {
      await unpublishIdea(id);
      // Optionally, refresh the ideas list after unpublishing
      loadIdeas();
    } catch (error) {
      console.error("Failed to unpublish idea:", error);
    }
  };

  const handlePublish = async (id) => {
    try {
      await publishIdea(id);
      // Optionally, refresh the ideas list after publishing
      loadIdeas();
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
    const displayIdeas = selectedStatus ? filteredIdeas : ideas;

    if (displayIdeas.length === 0) {
      return Array(MAX_ITEM)
        .fill()
        .map((_, index) => <SkeletonRow key={index} />);
    }
    return displayIdeas.map((idea) => (
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
          <Filter
            filterOptions={["Pending", "Released"]}
            onFilterChange={handleFilterChange}
          />
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
