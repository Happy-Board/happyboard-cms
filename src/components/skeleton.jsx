import styles from "./src/style./skeleton.module.css";

const Skeleton = ({ width, height }) => {
  return <div className={styles.skeleton} style={{ width, height }}></div>;
};

export default Skeleton;
