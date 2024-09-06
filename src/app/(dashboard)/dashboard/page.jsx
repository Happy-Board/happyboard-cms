"use client";

import "dotenv/config";

import styles from "@/styles/dashboard.module.css";
import Card from "@/components/ui/card";
import Transaction from "@/components/transactions";
import { Chart1, Chart2, Chart3, Chart4 } from "@/components/ui/chart";
import { Suspense, useEffect, useRef, useState } from "react";
import { fetchCats, fetchIdeas, fetchUsers } from "@/lib/data";
import useAuth from "@/lib/auth";

const Dashboard = () => {
  const MAX_ITEM = 1;
  const page = 1;

  const { uid, isAuthenticated } = useAuth();
  const [usersCount, setUsersCount] = useState(0);
  const [ideasCount, setIdeasCount] = useState(0);
  const [catsCount, setCatsCount] = useState(0);
  const intervalRef = useRef(null);

  const loadUsers = async () => {
    if (isAuthenticated && uid) {
      const { count } = await fetchUsers(uid, MAX_ITEM, page);
      setUsersCount(count);
    }
  };
  useEffect(() => {
    loadUsers();

    intervalRef.current = setInterval(() => {
      loadUsers();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid]);
  const loadIdeas = async () => {
    if (isAuthenticated && uid) {
      const { count } = await fetchIdeas(uid, MAX_ITEM, page);
      setIdeasCount(count);
    }
  };
  useEffect(() => {
    loadIdeas();

    intervalRef.current = setInterval(() => {
      loadIdeas();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid]);
  // const { count: catsCount } = useCatsData();
  const loadCats = async () => {
    if (isAuthenticated && uid) {
      const { count } = await fetchCats(uid);
      setCatsCount(count);
    }
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
  }, [uid]);

  return (
    <Suspense>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            <Card title="Total Members" number={usersCount || `...`} />
            <Card title="Total Ideas" number={ideasCount || `...`} />
            <Card title="Total Categories" number={catsCount || `...`} />
          </div>
          <div className={styles.chart}>
            <Chart1 />
            <Chart2 />
          </div>
          <div className={styles.chart}>
            <Chart3 />
            <Chart4 />
          </div>
          <Transaction />
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
