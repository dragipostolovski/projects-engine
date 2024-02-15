import Head from "next/head";
import { Inter } from "next/font/google";
import StatusBar from '@hooks/status-bar';
import SaveButton from '@hooks/save-button';
import Layout from "@components/Layout";
import styles from "@styles/Home.module.scss";
const inter = Inter({ subsets: ["latin"] });

const About = () => {

  return (
    <Layout className={styles.layoutIndex}>

      <Head>
        <title>About - Projects Engine</title>
        <meta name="description" content="Welcome to Projects Engine! We are a comprehensive online platform dedicated to providing high-quality PHP, JavaScript, HTML5, CSS3, and WordPress tutorials." />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <StatusBar />
        <SaveButton />
      </main>
      
    </Layout>
  );
}

export default About;