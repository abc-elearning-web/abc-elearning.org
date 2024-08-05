import styles from './index.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={[styles.footerContent, 'container'].join(' ')}>
                <div style={{ flex: 1 }}>
                    <a href='/'><img src='/images/logo.png' alt='logo' width='100px' /></a>
                </div>
                <div style={{ flex: 1, flexDirection: 'column', fontSize: 18 }} className={'flex flex-ai-start'}>
                    <div><strong>Contact Us</strong></div>
                    <div style={{height: 20}}></div>
                    <div>
                        <span>Email:</span>
                        <a href="mailto:support@abc-elearning.org">support@abc-elearning.org</a> 
                    </div>
                    <div style={{height: 20}}></div>
                    <div>
                        <span>Address:</span>
                        <span>209S Rosemont Ave Dallas, Texas</span> 
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;