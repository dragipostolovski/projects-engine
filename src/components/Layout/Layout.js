import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.scss';

const Layout = ({children, className, ...rest}) => { // prop
    let layoutClassName = styles.layout;

    if( className ) {
        layoutClassName = `${layoutClassName} ${className}`;
    }

    return (
        <div className={layoutClassName} {...rest}>
             <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {children}

            <Footer />
        </div>
    )
}

export default Layout;