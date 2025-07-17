import fs from "fs";

export default function HomePage(props) {
  const { data } = props;
  const info = data.find((a) => a.type === "home");
  const listContent = data.filter((a) => a.type === "blog");
  return (
    <>
      <div>1</div>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fs.readFileSync("public/json/data.json").toString();
  return {
    props: {
      data: data ? JSON.parse(data) : [],
    },
  };
};
