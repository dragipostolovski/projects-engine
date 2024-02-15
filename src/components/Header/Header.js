import styles from './Header.module.scss';

const Header = ({children, className, ...rest}) => { // prop
    let headerClassName = styles['site-header'];

    if( className ) {
        headerClassName = `${headerClassName} ${className}`;
    }

    return (
        <header className={headerClassName} {...rest}>
            {children}
        </header>
    )
}

export default Header;