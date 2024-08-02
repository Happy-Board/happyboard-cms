'use client'

import { usePathname } from 'next/navigation';
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md';



const Search = () => {
    const pathname = usePathname()
    return (<div className={styles.container}>
        <MdSearch />
        <input className={styles.input} type="text" placeholder={`Search for ${pathname.split("/").pop()}`} />
    </div>
    );
}

export default Search;