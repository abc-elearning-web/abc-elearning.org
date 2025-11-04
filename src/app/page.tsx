import fs from "fs";
import MyHead from "@/components/head";
import Home from "@/components/home";
import Layout from "@/components/layout";

export default async function HomePage() {
  const dataFile = fs.readFileSync("public/json/data.json", "utf-8").toString();
  const data = JSON.parse(dataFile);
  const info = data.find((a) => a.type === "home");
  const listContent = data.filter((a) => a.type === "blog");
  return (
    <>
      <MyHead
        title="ABC Elearning | Simplify your learning"
        description={info.subTitle}
        image={info.image}
      />
      <Layout>
        <Home items={listContent} />
      </Layout>
    </>
  );
}
