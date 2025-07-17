import Blog from "@/components/blog";
import Layout from "@/components/layout";
import data from "@/data/data.json";
import { notFound } from "next/navigation";
interface BlogPageProps {
  params: {
    blogId: string;
  };
}

export const generateMetadata = async ({ params }: BlogPageProps) => {
  const post = data.find(
    (a: any) => a.type === "blog" && a.url.includes(params.blogId)
  );
  return {
    title: post?.title,
    description: post?.subTitle,
  };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const post = data.find(
    (a) => a.type === "blog" && a.url.includes(params.blogId)
  );

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <Blog post={post} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = data.filter((a) => a.type === "blog");

  return posts.map((post: any) => ({
    blogId: post.url.slice(1),
  }));
}
