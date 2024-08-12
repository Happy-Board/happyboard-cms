import styles from "@/styles/card.module.css"
import Link from "next/link";

const Card = ({ title, number }) => {
   return (<div className={styles.container}><Link href={`${title.toLowerCase().replace('total ', '')}`}>
      <div className={styles.texts}>
         <span className={styles.title}>{title}</span>
         <span className={styles.number}>{number}</span>
      </div>
   </Link>
   </div>);
}

export default Card; 