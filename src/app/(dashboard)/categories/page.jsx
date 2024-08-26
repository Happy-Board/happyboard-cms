'use client'

import * as React from 'react';
import styles from '@/styles/category.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import {
    MdDeleteOutline,
    MdHighlightOff,

} from 'react-icons/md';
import Pagination from "@/components/pagination";
import { PopUp, ExistPopUp } from "@/components/ui/popup"
import { useDeleteCat } from '@/hooks/Categories/useDeleteCat';
import Search from '@/components/ui/search';
import { Suspense } from 'react';
import { useEffect, useRef, useState } from 'react';
import Skeleton from '@/components/Skeleton';
import useAuth from '@/lib/auth';
import { fetchCats } from '@/lib/data';
import { Flip, toast } from 'react-toastify';

library.add(fas);

const Category = () => {
    const q = 8;

    const { uid, isAuthenticated } = useAuth();

    const [cats, setCats] = useState([]);
    const [catsCount, setCatsCount] = useState(0);
    const intervalRef = useRef(null);

    const loadCats = async () => {
        if (isAuthenticated && uid) {
            const { cats, count } = await fetchCats(uid);
            setCats(cats);
            setCatsCount(count)
        }
    };
    const reloadCategories = async () => {
        await loadCats();
    };
    useEffect(() => {
        loadCats();

        intervalRef.current = setInterval(() => {
            loadCats();
        }, 300000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [uid])

    const { loadDelete } = useDeleteCat();

    const handleDelete = async (catId) => {
        if (window.confirm(`Are you sure you want to delete ?`)) {
            await loadDelete(catId);
            toast.error("Category's deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
                icon: ({ theme, type }) => <MdHighlightOff style={{ color: 'red' }} />,
            });
            loadCats()
        }
    }
    const SkeletonRow = () => (
        <tr>
            <td><Skeleton width="170px" height="30px" /></td>
            <td><Skeleton width="50px" height="20px" /></td>
            <td><Skeleton width="120px" height="30px" /></td>
        </tr>
    );
    const renderContent = () => {
        if (cats.length === 0) {
            return Array(q).fill().map((_, index) => (
                <SkeletonRow key={index} />
            ));
        }
        return cats.map((cat) => (
            <tr key={cats.id}>
                <td>
                    {cat.title}
                </td>
                <td><FontAwesomeIcon icon={cat.icon} /></td>
                <td>
                    <div className={styles.buttons}>
                        <ExistPopUp catName={cat.title} catIcon={cat.icon} catId={cat.id} onCategoryUpdated={reloadCategories} />
                        <button className={`${styles.status} ${styles.delete}`} onClick={() => { handleDelete(cat.id) }} title='Delete'><MdDeleteOutline />
                        </button>
                    </div>
                </td>
            </tr>
        ))
    };

    return (
        <Suspense>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Search />
                    <PopUp onCategoryAdded={reloadCategories} />
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Icon</td>
                            <td>Action</td>

                        </tr>
                    </thead>
                    <tbody>
                        {renderContent()}
                    </tbody>

                </table>
                <Pagination count={catsCount} />
            </div>
        </Suspense>
    );
}

export default Category;