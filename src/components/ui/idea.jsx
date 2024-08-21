import React, { useState } from 'react';
import Link from 'next/link';
import { MdBlock, MdVerified, MdVisibility } from 'react-icons/md';
import moment from 'moment-timezone';
import styles from '@/styles/idea.module.css';

const IdeaRow = ({ idea, page, handlePublish, handleUnpublish }) => {

  const [isPublished,setIsPublished] = useState(idea.isPublished);

  return (
    <tr key={idea.id}>
      <td>
        <div className={styles.title}>{idea.title}</div>
      </td>
      <td>{idea.User.email}</td>
      <td>{moment(idea.createdAt).format('MMMM Do YYYY')}</td>
      <td>{idea.Category?.title || 'No Cat'}</td>
      <td>
        <span className={`status ${isPublished ? styles.released : styles.pending}`}>
          {isPublished ? 'Released' : 'Pending'}
        </span>
      </td>
      <td>
        <div className={styles.buttons}>
          <Link href={`/ideas/${idea.id}?page=${page}`}>
            <button className={`status ${styles.view}`} title='View'><MdVisibility /></button>
          </Link>
          <button 
            className={`status ${styles.approve}`}
            title='Release'
            disabled={isPublished==true}
            onClick={() => {
              handlePublish(idea.id);
              setIsPublished(true);
            }}
          >
            <MdVerified />
          </button>
          <button 
            className={`status ${styles.unpublish}`}
            title='Unpublish'
            onClick={() => {
              handleUnpublish(idea.id);
              setIsPublished(false);
            }}
            disabled={isPublished==false}
          >
            <MdBlock />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default IdeaRow;