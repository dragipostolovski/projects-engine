import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@components/Layout";
import styles from "@styles/Home.module.scss";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Container from "@components/Container";
import Begginer from "@components/Beginner";
// import products from '@data/products.json';

const inter = Inter({ subsets: ["latin"] });

export default function Home({products}) {
  return (
    <Layout className={styles.layoutIndex}>

      <Head>
          <title>About - Projects Engine</title>
          <meta name="description" content="Welcome to Projects Engine! We are a comprehensive online platform dedicated to providing high-quality PHP, JavaScript, HTML5, CSS3, and WordPress tutorials." />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>

        <Container className={styles.productsContainer}>
          <div className={styles.productsList}>
            {products ? products.map(product => {
                const { featuredImage } = product;

                return (
                  <div className={styles.productItem} key={product.id}>
                    <Image width="1200" height="750" src={featuredImage.node.sourceUrl} alt={featuredImage.node.altText} priority />
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <div className={styles.productDesc} dangerouslySetInnerHTML={{ __html: product.content }} />
                  </div>
                )
            }) : ''}
          </div>
        </Container>

        <div className={styles.description}>
          <p>Get started by visiting our <code className={styles.code}><a href="/products">products page</a></code>.</p>
        </div>

        <Begginer />
      </main>

    </Layout>
  );
}

// export async function getStaticProps() {

//   const client = new ApolloClient({
//     uri: process.env.WP_API,
//     cache: new InMemoryCache()
//   });

//   const response = await client.query({
//     query: gql`
//       query NewQuery {
//         products {
//           edges {
//             node {
//               id
//               productId
//               title
//               content
//               date
//               slug
//               uri
//               product {
//                 productId
//                 productPrice
//               }
//               featuredImage {
//                 node {
//                   mediaItemId
//                   altText
//                   sourceUrl
//                 }
//               }
//             }
//           }
//         }
//       }
//     `
//   });

//   const products = response.data.products.edges.map(({node}) => {
//     const data = {
//       ...node,
//       ...node.product,
//       ...node.featuredImage.node
//     }

//     return data;
//   })

//   return {
//     props: {
//       products 
//     }
//   }
// }