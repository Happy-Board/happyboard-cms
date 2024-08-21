'use client'

import 'dotenv/config';

import styles from '@/styles/dashboard.module.css';
import Card from '@/components/ui/card';
import Transaction from '@/components/transactions';
import Chart from '@/components/ui/chart';
import { useUsersData } from '@/hooks/useUsersData';
import { useIdeasData } from '@/hooks/useIdeasData';
import { useCatsData } from '@/hooks/Categories/useCatsData';
import { Suspense } from 'react';

const Dashboard = ({ searchParams }) => {

    const q =1;
    const page = searchParams?.page || 1;

    const { count: usersCount } = useUsersData(q, page);
    const { count: ideasCount } = useIdeasData(q, page);
    const { count: catsCount} = useCatsData();


    return (
        <Suspense>
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card title='Total Members' number={usersCount || `...`} />
                    <Card title='Total Ideas' number={ideasCount || `...`} />
                    <Card title='Total Categories' number={catsCount || `...`} />
                </div>
                <Transaction />
                <Chart />
            </div>
        </div>
        </Suspense>
    );
}

export default Dashboard;