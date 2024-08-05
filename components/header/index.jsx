import styles from './index.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={`container flex flex-ai-center flex-jc-sb`}>
                <a href='/'><img src='/images/logo.png' className={styles.logo} alt='home' /></a>
                <div style={{ color: 'white' }}>Menu</div>
            </div>
        </div>
    );
}

export default Header;