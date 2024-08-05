import styles from './index.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={[styles.footerContent, 'container'].join(' ')}>
                <div style={{ flex: 1 }}>
                    <a href='/'><img src='/images/logo.png' alt='logo' /></a>
                </div>
                <div style={{ flex: 1 }} className={'flex flex-ai-center'}>
                    <div style={{ width: '100%' }}>
                        <div><strong>Useful Links</strong></div>
                        <div>
                            <span>Email:</span>
                            <a href="https://abc-elearning.org/about-us/" target="_blank">About Us</a> 
                        </div>
                        <div>
                            <span>Contact Us</span>
                            <a href="https://abc-elearning.org/contact/" target="_blank">About Us</a> 
                        </div>
                    </div>
                    <div style={{ width: 100 }}></div>
                    <div style={{ width: '100%' }}>
                        <div><strong>Contact Us</strong></div>
                        <div>
                            <span>Email:</span>
                            <a href="mailto:support@abc-elearning.org">support@abc-elearning.org</a> 
                        </div>
                        <div>
                            <span>Address:</span>
                            <span>209S Rosemont Ave Dallas, Texas</span> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;