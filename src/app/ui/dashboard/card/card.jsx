import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css"
import Link from "next/link";

const Card = ({ title, number }) => {
   return (<div className={styles.container}><Link href={`/dashboard/${title.toLowerCase().replace('total ', '')}`}>
      <div className={styles.texts}>
         <span className={styles.title}>{title}</span>
         <span className={styles.number}>{number}</span>
      </div>
   </Link>
   </div>);
}

export default Card; 