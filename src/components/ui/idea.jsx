import React, { useState } from "react";
import Link from "next/link";
import { MdBlock, MdHighlightOff, MdVerified } from "react-icons/md";
import moment from "moment-timezone";
import styles from "./src/styles/idea.module.css";
import { Flip, toast } from "react-toastify";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const IdeaRow = ({ idea, page, handlePublish, handleUnpublish }) => {
  const [isPublished, setIsPublished] = useState(idea.isPublished);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFirstTime, setisFirstTime] = useState(true);

  const handlePublishing = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setisFirstTime(false);
    try {
      await handlePublish(idea.id);
      setTimeout(() => {
        setIsPublished(true);
        setIsProcessing(false);
        toast.success("Idea released successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      }, 100);
    } catch (error) {
      console.error("Error activating user:", error);
      setIsProcessing(false);
    }
  };

  const handleUnpublishing = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await handleUnpublish(idea.id);
      setTimeout(() => {
        setIsPublished(false);
        setIsProcessing(false);
        toast.error("Idea unpublished successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
          icon: ({ theme, type }) => (
            <MdHighlightOff style={{ color: "red" }} />
          ),
        });
      }, 100);
    } catch (error) {
      console.error("Error banning user:", error);
      setIsProcessing(false);
    }
  };

  return (
    <tr key={idea.id}>
      <td>
        <div className={styles.ideaWrapper} title="View info">
          <Link href={`/ideas/${idea.id}?page=${page}`}>
            <div className={styles.title}>{idea.title}</div>
          </Link>
        </div>
      </td>
      <td>{idea.User.email}</td>
      <td>{moment(idea.createdAt).format("DD/MM/YYYY")}</td>
      <td>
        {isPublished == false && `Not yet released`}
        {isPublished == true && isFirstTime == true && moment(idea.updatedAt).format("DD/MM/YYYY")}
        {isPublished == true && isFirstTime == false && moment().format("DD/MM/YYYY")}
      </td>
      <td>{idea.Category?.title || "No Cat"}</td>
      <td>
        <span
          className={`status ${isPublished ? styles.released : styles.pending}`}
        >
          {isPublished ? "Released" : "Pending"}
        </span>
      </td>
      <td>
        {isProcessing && (
          <div className={styles.dotspinner}>
            <div className={styles.dotspinnerdot}></div>
            <div className={styles.dotspinnerdot}></div>
            <div className={styles.dotspinnerdot}></div>
            <div className={styles.dotspinnerdot}></div>
            <div className={styles.dotspinnerdot}></div>
            <div className={styles.dotspinnerdot}></div>
            <div className={styles.dotspinnerdot}></div>
            <div className={styles.dotspinnerdot}></div>
          </div>
        )}
        {!isProcessing && (
          <div className={styles.buttons}>
            <button
              className={`status ${styles.approve}`}
              title="Release"
              onClick={handlePublishing}
              disabled={isPublished == true}
            >
              <MdVerified />
            </button>
            <button
              className={`status ${styles.unpublish}`}
              title="Unpublish"
              onClick={handleUnpublishing}
              disabled={isPublished == false}
            >
              <MdBlock />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default IdeaRow;
