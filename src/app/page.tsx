import Home from "@/components/home";
import Layout from "@/components/layout";
import data from "@/data/data.json";
import { Metadata } from "next";

const home = data.find((a: any) => a.type === "home");

export const metadata: Metadata = {
  title: home?.title,
  description: home?.subTitle,
  openGraph: {
    title: "ABC Elearning | Simplify your learning",
    description: "Simplify your learning with ABC Elearning platform",
    images: ["/images/logo.png"],
    type: "website",
  },
};

export default async function HomePage() {
  const listContent = data.filter((a) => a.type === "blog");

  return (
    <Layout>
      <Home items={listContent} />
    </Layout>
  );
}
