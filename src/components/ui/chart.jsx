"use client"

import styles from '@/styles/chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: "Sun",
        visit: 4,
    },
    {
        name: "Mon",
        visit: 3,
    },
    {
        name: "Tue",
        visit: 2,
    },
    {
        name: "Wed",
        visit: 3,
    },
    {
        name: "Thu",
        visit: 1,
    },
    {
        name: "Fri",
        visit: 3,
    },
    {
        name: "Sat",
        visit: 5,
    },
];

const Chart = () => {
    return (
        <div className={styles.container}>

            <h2 className={styles.title}>Weekly Recap (FAKE DATA)</h2>

                <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
                        <Legend />
                        <Line type="monotone" dataKey="visit" stroke="#82ca9d" strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
    )
}

export default Chart