import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Display from "@/modules/dashboard/components/Display"
import Sidebar from "@/modules/dashboard/components/Sidebar"
import { ErrorBoundary } from "@/modules/helpers/ErrorBoundary"


function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Events Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* A link for testing the proof of concept. 
            As of now both creating an identified user and fetching 
            user details is possible. 
        */}
        <div>
          Link to Demo E-commerce page:
          {/* When a new user is added go back to home page and view the id and email. */}
          <Link href='/EcommerceAnalytics'> Ecommerce Page</Link>
        </div>

        <ErrorBoundary>
          <Display />
        </ErrorBoundary>
        <ErrorBoundary>
          <Sidebar />
        </ErrorBoundary>
      </main>
    </div>
  )
}

export default Home
