import fs from "fs";
import Blog from "../../components/blog";
import MyHead from "../../components/head";
import Layout from "../../components/layout";

const BlogPage = ({ post }) => {
  if (!post) {
    return <h1>404 - Page Not Found</h1>;
  }
  return (
    <div>
      <MyHead
        title={post.title}
        description={post.subTitle}
        image={post.image}
      />
      <Layout>
        <Blog post={post} />
      </Layout>
    </div>
  );
};

export const getStaticPaths = async () => {
  const data = JSON.parse(
    await fs.readFileSync("public/json/data.json").toString()
  );
  const posts = data.filter((a) => a.type === "blog");
  return {
    paths: posts.map((a) => {
      return {
        params: {
          blogId: a.url.slice(1),
        },
      };
    }),
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps = async (context) => {
  const blogId = context?.params?.blogId;
  const data = JSON.parse(
    await fs.readFileSync("public/json/data.json").toString()
  );
  const post = data.find((a) => a.type === "blog" && a.url.includes(blogId));
  return {
    props: {
      post: post ?? null,
    },
  };
};

export default BlogPage;
