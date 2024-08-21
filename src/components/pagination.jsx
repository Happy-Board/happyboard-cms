'use client'

import styles from '@/styles/pagination.module.css';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

const Pagination = ({ count }) => {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") || 1;

    const params = new URLSearchParams(searchParams);
    const ITEM_PER_PAGE = 9;

    const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;
    // const hasNext = ITEM_PER_PAGE * parseInt(page) < count;
    const handleChangePage = (type) => {
        type === "prev"
            ? params.set("page", parseInt(page) - 1)
            : params.set("page", parseInt(page) + 1);
        replace(`${pathname}?${params}`);
    };
    return (
        <Suspense>
            <div className={styles.container}>
                <button className={styles.button} disabled={!hasPrev}
                    onClick={() => handleChangePage("prev")}><MdArrowBackIosNew /></button>
                <button className={styles.button} disabled={!hasNext}
                    onClick={() => handleChangePage("next")}><MdArrowForwardIos /></button>
            </div>
        </Suspense>);
}

export default Pagination;