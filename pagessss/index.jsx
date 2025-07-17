import fs from 'fs';
import MyHead from '../components/head';
import Home from '../components/home';
import Layout from '../components/layout';

export default function HomePage(props) {
	const {data} = props;
	const info = data.find(a => a.type === 'home');
	const listContent = data.filter(a => a.type === 'blog');
	return (
		<>
			<MyHead
				title="ABC Elearning | Simplify your learning"
				description={info.subTitle}
			/>
			<Layout>
				<Home items={listContent} />
			</Layout>
		</>
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