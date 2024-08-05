import Footer from "../footer/footer";
import Header from "../header";
import styles from './index.module.css';

const Layout = ({ children }) => {
    return (
        <main className={styles.main}>
            <Header />
            {children}
            <Footer />
        </main>
    );
}

export default Layout;