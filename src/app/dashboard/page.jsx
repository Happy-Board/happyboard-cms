import styles from '../ui/dashboard/dashboard.module.css';
import Card from '../ui/dashboard/card/card';
import Transaction from '../ui/dashboard/transactions/transactions';
import Chart from '../ui/dashboard/chart/chart';


const Dashboard = () => {
    return (<div className={styles.wrapper}>
        <div className={styles.main}>
            <div className={styles.cards}>
                <Card title='Total Users' number='5' />
                <Card title='Total Ideas' number='12' />
                <Card title='Total Categories' number='6' />
            </div>
            <Transaction />
            <Chart />
        </div>
        {/* <div className={styles.side}>
            <RightBar />
        </div> */}

    </div>);
}

export default Dashboard;