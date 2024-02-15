import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@components/Header";
import styles from "@styles/Home.module.scss";
import Footer from "@components/Footer";
const inter = Inter({ subsets: ["latin"] });

export default function About() {
  return (
    <>
      <Head>
        <title>About - Projects Engine</title>
        <meta name="description" content="Welcome to Projects Engine! We are a comprehensive online platform dedicated to providing high-quality PHP, JavaScript, HTML5, CSS3, and WordPress tutorials." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={`${styles.main} ${inter.className}`}>

      </main>
      <Footer />
    </>
  );
}