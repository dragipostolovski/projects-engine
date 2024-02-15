import styles from './Footer.module.scss';

const Header = ({children, className, ...rest}) => { // prop
    let footerClassName = styles.siteFooter;

    if( className ) {
        footerClassName = `${footerClassName} ${className}`;
    }

    return (
        <footer className={footerClassName} {...rest}>
            <div className={`${styles.siteFooterInner}`}>
                {children}
            </div>
        </footer>
    )
}

export default Header;