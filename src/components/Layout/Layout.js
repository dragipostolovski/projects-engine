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
            <Header />
            {children}

            <Footer />
        </div>
    )
}

export default Layout;