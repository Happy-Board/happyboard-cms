'use client'

import 'dotenv/config';

import styles from '@/styles/dashboard.module.css';
import Card from '@/components/ui/card';
import Transaction from '@/components/transactions';
import Chart from '@/components/ui/chart';
import { useUsersData } from '@/hooks/useUsersData';
import { useIdeasData } from '@/hooks/useIdeasData';

const Dashboard = ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const { users, count: usersCount, loading: usersLoading } = useUsersData();
    const { ideas, count: ideasCount, loading: ideasLoading } = useIdeasData(q, page);


    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card title='Total Users' number={usersCount || `...`} />
                    <Card title='Total Ideas' number={ideasCount || `...`} />
                    <Card title='Total Categories' number='6' />
                </div>
                <Transaction />
                <Chart />
            </div>
        </div>
    );
}

export default Dashboard;