"use client";

import React from "react";
import styles from "../../app/page.module.css";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  //   console.log("SESSION ", session);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    // return <a href="/api/auth/signin">Sign in</a>;
    return <w3m-button />;
  }

  return (
    <section className={styles.main}>
      <div className={styles.center}>
        <h1>Welcome to your Dashboard</h1>
      </div>
      <div className={styles.description}>
        <p>Signed in as {session?.address}</p>
        <Link href="/">Home</Link>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Card Title 1</h2>
          <p>Card content goes here...</p>
        </div>
        <div className={styles.card}>
          <h2>Card Title 2</h2>
          <p>Card content goes here...</p>
        </div>
      </div>
    </section>
  );
}
