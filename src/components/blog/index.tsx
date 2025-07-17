import Link from "next/link";
import styles from "./index.module.css";

interface Post {
  title: string;
  description: string;
  image: string;
}

interface BlogProps {
  post: Post;
}

const Blog = ({ post }: BlogProps) => {
  return (
    <div className="container">
      <div className={"flex flex-ai-start flex-jc-sb " + styles.item}>
        <div
          style={{ flex: 1, backgroundImage: `url(${post.image})` }}
          className={styles.image}
        ></div>
        <div style={{ width: 80 }}></div>
        <div style={{ flex: 1 }}>
          <h1>{post.title}</h1>
          <div
            style={{ fontSize: 20 }}
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></div>
        </div>
      </div>
      <div style={{ height: 100 }}></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          className="start-button"
          target="_blank"
          href={"https://passemall.com/about-us"}
        >
          Get Started
        </Link>
      </div>
      <div style={{ height: 100 }}></div>
    </div>
  );
};

export default Blog;
