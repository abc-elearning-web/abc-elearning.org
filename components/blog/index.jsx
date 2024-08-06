import Image from 'next/image';
import styles from './index.module.css';

const Blog = ({ post }) => {
    return (
        <div className='container'>
            <div className={"flex flex-ai-start flex-jc-sb " + styles.item}>
                <div style={{ flex: 1 }}>
                    <div style={{ height: 30 }}></div>
                    <Image src={post.image} alt={post.title} style={{ width: '100%' }} />
                </div>
                <div style={{ width: 80 }}></div>
                <div style={{ flex: 1 }}>
                    <h1>{post.title}</h1>
                    <div style={{ fontSize: 20 }} dangerouslySetInnerHTML={{ __html: post.description }}></div>
                </div>
            </div>
            <div style={{ height: 100 }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a className='start-button' target='_blank' href={'https://passemall.com/'}>Get Started</a>
            </div>
            <div style={{ height: 100 }}></div>
        </div>
    );
}

export default Blog;