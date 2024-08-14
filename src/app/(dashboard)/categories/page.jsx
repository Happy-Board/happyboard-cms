'use client'

import * as React from 'react';
import styles from '@/styles/category.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import {
    MdDeleteOutline,

} from 'react-icons/md';
import Pagination from "@/components/pagination";
import { PopUp, ExistPopUp } from "@/components/ui/popup"
import { useCatsData } from '@/hooks/useCatsData';
library.add(fas);

const Category = () => {

    

    const { cats, count } = useCatsData();


    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <PopUp />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Icon</td>
                        <td>Action</td>

                    </tr>
                </thead>
                <tbody>{cats.map((cat) => (
                    <tr key={cats.id}>
                        <td>
                            {cat.title}
                        </td>
                        <td><FontAwesomeIcon icon={cat.icon} /></td>
                        <td>
                            <div className={styles.buttons}>
                                <ExistPopUp catName={cat.title} />
                                <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                                </button>
                            </div>
                        </td>

                    </tr>
                ))}
                </tbody>

            </table>
            <Pagination count={count} />
        </div>
    );
}

export default Category;