import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@components/Layout";
import styles from "@styles/Home.module.scss";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Container from "@components/Container";
import Begginer from "@components/Beginner";
import { useState } from "react";
import Fuse from 'fuse.js'

// import products from '@data/products.json';

const inter = Inter({ subsets: ["latin"] });

const FeaturedImage = ({post}) => {
    const { featuredImage } = post;

    if( !featuredImage )
        return;

    return (
        <Image width="1200" height="750" src={featuredImage.node.sourceUrl} alt={featuredImage.node.altText} priority />
    )
}

export default function Posts({posts, categories}) {
    const [ activeCat, setActiveCat ] = useState('All posts'); // default value is ''
    const [ query, setQuery ] = useState();

    let activePosts = posts;

    if( 'All posts' != activeCat ) {
        let filtered = [];

        activePosts.map( (post) => {
            post.categories.map( (cat) => {
                
                if( cat.categoryId == activeCat ) {
                    filtered.push(post);
                }

            })
        } )

        activePosts = filtered;
    }

    const fuse = new Fuse(activePosts, {
      keys: [
        'title',
        'categories.name'
      ],
      includeScore: true
    });

    if( query ) {
        const results = fuse.search(query);
        
        console.log(results);

        activePosts = results.map( ({item} ) => item );

        // activePosts = activePosts.filter(({title} ) => {
        //     return title.toLowerCase().includes(query.toLowerCase());
        // }) 
    }

    function handleSearchPosts(e) {
        const searchFor = e.target.value;
        setQuery(searchFor);
    }

  return (
    <Layout className={styles.layoutIndex}>

      <Head>
          <title>Blog - Projects Engine</title>
          <meta name="description" content="Welcome to Projects Engine! We are a comprehensive online platform dedicated to providing high-quality PHP, JavaScript, HTML5, CSS3, and WordPress tutorials." />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>

        <Container className={styles.productsContainer}>
            <div className={styles.discover}>
              <from>
                  <input type="text" name="s" id="s" onChange={handleSearchPosts}/>
              </from>
            </div>
            <select className={styles.filterPosts} onChange={(e) => setActiveCat(e.target.value)}>
                <option value={undefined} >All posts</option>
                {categories.map(cat => {
                    return (
                        <option key={cat.id} value={cat.termTaxonomyId} data-slug={cat.slug}>{cat.name}</option>
                    )
                })}

            </select>

            <div className={styles.productsList}>
            {activePosts.map(post => {

                return (
                    <div className={styles.productItem} key={post.id}>
                    <FeaturedImage post={post} />
                    <h3 className={styles.productTitle}>{post.title}</h3>
                    <div className={styles.productDesc} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                )
            })}
            </div>

            <div className={styles.description}>
                <p>Get started by visiting our <code className={styles.code}><a href="/products">products page</a></code>.</p>
            </div>

            <Begginer />
        </Container>
      </main>

    </Layout>
  );
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: process.env.WP_API,
    cache: new InMemoryCache()
  });

  const response = await client.query({
    query: gql`
    query GetPosts {
        posts {
          edges {
            node {
              date
              excerpt
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              id
              postId
              slug
              title
              content
              categories {
                edges {
                  node {
                    categoryId
                    name
                    id
                    slug
                    termTaxonomyId
                  }
                }
              }
            }
          }
        }
        categories {
          edges {
             node {
                id
                name
                slug
                termTaxonomyId
             }
          }
        }
      }
    `
  });

  const posts = response.data.posts.edges.map(({node}) => {
    const data = {
      ...node,
      ...node.featuredImage,
      categories: node.categories.edges.map( ({node}) => node)
    }

    return data;
  })

  const categories = response.data.categories.edges.map(({node}) => {
    const data = {
      ...node,
    }

    return data;
  })

  return {
    props: {
        posts,
        categories
    }
  }
}