import Link from "next/link";
import styles from "./index.module.css";

interface Item {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  url: string;
  image: string;
  position: string;
  type: string;
}

interface HomeProps {
  items?: Item[];
}

const Home = ({ items }: HomeProps) => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerT} style={{ zIndex: 1 }}></div>
      </div>
      <div className={"container "}>
        {items?.map((item) => {
          return (
            <section
              key={"section-" + item.id}
              className={
                [
                  item.position === "left" ? styles.left : styles.right,
                  styles.sectionItem,
                  styles.flexAICenter,
                  styles.flexJCSB,
                ].join(" ") +
                " " +
                styles.item
              }
            >
              <div style={{ flex: 1 }}>
                <h2>{item.title}</h2>
                <div style={{ height: 20 }}></div>
                <div dangerouslySetInnerHTML={{ __html: item.subTitle }}></div>
                <div style={{ height: 20 }}></div>
                <Link className="start-button" target="_blank" href={item.url}>
                  Get Started
                </Link>
              </div>
              <div style={{ width: 100 }}></div>
              <div
                style={{
                  flex: 1,
                  backgroundImage: `url(${item.image})`,
                }}
                className={styles.itemImage}
              >
                {/* <img style={{ width: '100%', borderRadius: 12 }} src={item.image} alt={item.title} href={item.url} /> */}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default Home;
