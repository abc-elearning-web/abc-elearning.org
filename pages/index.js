import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from 'fs';

export default function Home(props) {
	const {data} = props;
	const info = data.find(a => a.type === 'home');
	const listContent = data.filter(a => a.type === 'blog');
	return (
		<div className='home'>
			<Head>
				<title>ABC Elearning | Simplify your learning</title>
				<meta name="description" content={info.subTitle} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.header}>
					<div className={['container', styles.flex, styles.flexAICenter, styles.flexJCSB].join(' ')}>
						<a href='/'><img src='/images/logo.png' className={styles.homeLogo} alt='home' /></a>
						<div style={{ color: 'white' }}>Menu</div>
					</div>
				</div>
				<div className={styles.banner}>
					<div className={styles.bannerT} style={{zIndex: 1}}></div>
				</div>
				<div className={'container'}>
					{ listContent.map((item) => {
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
									<img src={item.image} alt={item.title} href={item.url} />
								</div>
							</section>
						);
					}) }
				</div>
			</main>

			<footer className={styles.footer}>
				<div className={[styles.footerContent, 'container'].join(' ')}>
					<div style={{ flex: 1 }}>
						<a href='/'><img src='/images/logo.png' alt='logo' /></a>
					</div>
					<div style={{ flex: 1 }} className={[styles.flex, styles.flexAICenter].join(' ')}>
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
		</div>
	)
}

export const getServerSideProps = async () => {
	const data = await fs.readFileSync('public/json/data.json').toString();
	return { 
		props: {
			data: data ? JSON.parse(data) : []
		} 
	}
}