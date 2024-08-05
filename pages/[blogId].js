import fs from 'fs';
import Head from 'next/head';

const Blog = ({ post }) => {
    console.log(post);
    if(!post) {
        return <h1>404 - Page Not Found</h1>;
    }
    return (
        <div>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.subTitle} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='container' style={{ padding: '20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={post.image} />
                </div>
                <div style={{ height: 100 }}></div>
                <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                <div style={{ height: 100 }}></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <a className='start-button' target='_blank' href={'https://passemall.com/'}>Get Started</a>
                </div>
            </main>
        </div>
    );
}

export const getStaticPaths = async () => {
    const data = JSON.parse(await fs.readFileSync('public/json/data.json').toString());
    const posts = data.filter(a => a.type === 'blog');
    return {
        paths: posts.map(a => {
            return {
                params: {
                    blogId: a.url.slice(1),
                },
            };
        }),
        fallback: true, // false or "blocking"
    }
}

export const getStaticProps = async (context) => {
    const blogId = context?.params?.blogId;
    const data = JSON.parse(await fs.readFileSync('public/json/data.json').toString());
    const post = data.find(a => a.type === 'blog' && a.url.includes(blogId));
    return {
        props: {
            post: post ?? null
        }
    }
}

export default Blog;