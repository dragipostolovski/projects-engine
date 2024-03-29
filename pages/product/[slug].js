import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@styles/Home.module.scss";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Container from "@components/Container";

const inter = Inter({ subsets: ["latin"] });

export default function Product({product}) {
  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content="Product description: " />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <Container className={styles.productsContainer}>
            <div className={styles.productItem}>
                <h3 className={styles.productTitle}>
                  <a href="/products">All Products</a>
                </h3>
                
                <p>{product.title}</p>
            </div>
        </Container>
      </main>
    </>
  );
}

// Send an object as prop
export async function getStaticProps({params}) {

  const { slug } = params;

  const client = new ApolloClient({
    uri: process.env.WP_API,
    cache: new InMemoryCache()
  });

  const response = await client.query({
    query: gql`
    query ProductBySlug($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        title
        product {
          productId
          productPrice
        }
        content
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        id
      }
    }
    `,
    variables: {
      slug: slug
    }
  });

  const product = {
    ...response.data.product,
    ...response.data.product.product,
    featuredImage: {
      ...response.data.product.featuredImage.node
    }
  }

  return {
    props: {
      product 
    }
  }
}

/**
 * Dynamic paths [slug]
 */
export async function getStaticPaths() {

    const client = new ApolloClient({
      uri: process.env.WP_API,
      cache: new InMemoryCache()
    });
  
    const response = await client.query({
      query: gql`
        query NewQuery {
          products {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
    });
  
    const paths = response.data.products.edges.map(({node}) => {
     return {
        params: {
            slug: node.slug
        }
     }
    });
  
    return {
        paths,
        fallback: false
    }

}