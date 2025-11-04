import Image from 'next/image';
import styles from './index.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={`container flex flex-ai-center flex-jc-sb`}>
                <a href='/'><Image src='/images/logo.png' className={styles.logo} alt='logo home' width={48} height={48} /></a>
                {/* <div style={{ color: 'white' }}>Menu</div> */}
                <div></div>
            </div>
        </div>
    );
}

export default Header;