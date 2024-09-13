"use client";

import styles from "./src/styles/chart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import useAuth from "./src/lib/auth";
import { fetchEventsByDay, fetchViewsByDay } from "./src/lib/data";
import { useEffect, useRef, useState } from "react";

const Chart1 = () => {
  const { uid, isAuthenticated } = useAuth();
  const [viewsByDay, setViewByDay] = useState([]);
  const intervalRef = useRef(null);

  const loadChart = async () => {
    if (uid && isAuthenticated) {
      const resViews = await fetchViewsByDay(uid);
      setViewByDay(resViews);
    }
  };

  useEffect(() => {
    loadChart();
    intervalRef.current = setInterval(() => {
      loadChart();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid]);
  const viewsData = viewsByDay.map((data) => ({
    date: data.date,
    views: data.views,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Daily Views</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={viewsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#82ca9d"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const Chart2 = () => {
  const { uid, isAuthenticated } = useAuth();
  const [eventsByDay, setEventsByDay] = useState([]);
  const intervalRef = useRef(null);

  const loadChart = async () => {
    if (uid && isAuthenticated) {
      const resEvents = await fetchEventsByDay(uid);
      setEventsByDay(resEvents);
    }
  };

  useEffect(() => {
    loadChart();
    intervalRef.current = setInterval(() => {
      loadChart();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid]);

  const eventsData = eventsByDay.map((data) => ({
    date: data.date,
    events: data.events,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Daily Events</h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={eventsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c" }} />
          <Legend />
          <Bar dataKey="events" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Chart3 = () => {
  const { uid, isAuthenticated } = useAuth();
  const [viewsByDay, setViewByDay] = useState([]);
  const intervalRef = useRef(null);

  const loadChart = async () => {
    if (uid && isAuthenticated) {
      const resViews = await fetchViewsByDay(uid);
      setViewByDay(resViews);
    }
  };

  useEffect(() => {
    loadChart();
    intervalRef.current = setInterval(() => {
      loadChart();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid]);
  const viewsData = viewsByDay.map((data) => ({
    date: data.date,
    views: data.views,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New Users</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={viewsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#82ca9d"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Chart4 = () => {
  const { uid, isAuthenticated } = useAuth();
  const [viewsByDay, setViewByDay] = useState([]);
  const intervalRef = useRef(null);

  const loadChart = async () => {
    if (uid && isAuthenticated) {
      const resViews = await fetchViewsByDay(uid);
      setViewByDay(resViews);
    }
  };

  useEffect(() => {
    loadChart();
    intervalRef.current = setInterval(() => {
      loadChart();
    }, 300000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uid]);
  const viewsData = viewsByDay.map((data) => ({
    date: data.date,
    views: data.views,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New Ideas</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={viewsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#82ca9d"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { Chart1, Chart2, Chart3, Chart4 };
