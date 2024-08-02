import { MdDeleteOutline, MdVerified } from 'react-icons/md';
import styles from '../../../ui/dashboard/singleIdea/singleIdea.module.css';
import Image from 'next/image';



const SigleIdeaPage = () => {
    return (
        <div className={styles.container}>

            <div className={styles.formContainer}>
                <Link href='./ideas/page.jsx' className={styles.buttons}>
                    <button className={`${styles.status} ${styles.approve}`} title='Release' > <MdVerified /></button>
                    <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline /></button>
                </Link>
                <h3 className={styles.title}>-Title- Lorem ipsum dolor sit amet </h3>
                <p className={styles.author}>-Author- Astersa</p>
                <p className={styles.content}>-Content- Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, corporis quam dicta quisquam placeat nesciunt, pariatur, perspiciatis optio cumque quos repellendus ratione. Adipisci fugiat minus sed magni incidunt, cupiditate laboriosam? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus consequatur dolores nobis saepe dolore aut, iste quisquam hic tenetur vitae? Omnis amet ipsum explicabo repudiandae! Magni iure qui hic iste.</p>
            </div>

        </div>
    );
}

export default SigleIdeaPage;