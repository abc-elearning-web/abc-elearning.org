import styles from './index.module.css';

const Home = ({items}) => {
    return (
        <>
            <div className={styles.banner}>
                <div className={styles.bannerT} style={{zIndex: 1}}></div>
            </div>
            <div className={'container'}>
                { items.map((item) => {
                    return (
                        <section key={'section-' + item.id} className={[item.position === 'left' ? styles.left : styles.right, styles.sectionItem, styles.flexAICenter, styles.flexJCSB].join(' ')}>
                            <div style={{ flex: 1 }}>
                                <h2>{item.title}</h2>
                                <div style={{ height: 20 }}></div>
                                <div dangerouslySetInnerHTML={{ __html: item.subTitle }}></div>
                                <div style={{ height: 20 }}></div>
                                <a className='start-button' target='_blank' href={item.url}>Get Started</a>
                            </div>
                            <div style={{ width: 100 }}></div>
                            <div style={{ flex: 1 }}>
                                <img style={{ width: '100%', borderRadius: 12 }} src={item.image} alt={item.title} href={item.url} />
                            </div>
                        </section>
                    );
                }) }
            </div>
        </>
    );
}

export default Home;