'use client'

import * as React from 'react';
import styles from '@/styles/category.module.css';
import Link from 'next/link';


import {
    MdBuild,
    MdDeleteOutline,

} from 'react-icons/md';
import Pagination from "@/components/pagination";
import { PopUp, ExistPopUp } from "@/components/ui/popup"

const Category = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <PopUp />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Total Used</td>
                        <td>Action</td>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Technology
                        </td>
                        <td>12</td>
                        <td>
                            <div className={styles.buttons}>
                                <ExistPopUp catName='Technology' />
                                <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                                </button>
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <div className={styles.title}>
                                Culture
                            </div>
                        </td>
                        <td>13</td>


                        <td>
                            <div className={styles.buttons}>
                                <ExistPopUp catName='Culture' />
                                <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.title}>
                                Life
                            </div>
                        </td>
                        <td>10</td>
                        <td>
                            <div className={styles.buttons}>
                                <ExistPopUp catName='Life' />
                                <button className={`${styles.status} ${styles.delete}`} title='Delete'><MdDeleteOutline />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}

export default Category;