import Blog from "@/components/blog";
import MyHead from "@/components/head";
import Layout from "@/components/layout";
import { notFound } from "next/navigation";
import fs from "fs";

const getStaticProps = async (blogId: string) => {
  const data = JSON.parse(fs.readFileSync("public/json/data.json").toString());
  const post = data.find(
    (a: any) => a.type === "blog" && a.url.includes(blogId)
  );
  return {
    props: {
      post: post ?? null,
    },
  };
};

async function getStaticPaths() {
  const data = JSON.parse(fs.readFileSync("public/json/data.json").toString());
  const posts = data.filter((a: any) => a.type === "blog");
  return {
    paths: posts.map((a: any) => {
      return {
        params: {
          blogId: a.url.slice(1),
        },
      };
    }),
    fallback: true,
  };
}

export async function generateStaticParams() {
  const { paths } = await getStaticPaths();
  return paths.map((path: any) => path.params);
}

export const dynamicParams = true;

// Page component
const BlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const { props } = await getStaticProps(blogId);
  const { post } = props;

  if (!post) {
    return notFound();
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

export default BlogPage;
