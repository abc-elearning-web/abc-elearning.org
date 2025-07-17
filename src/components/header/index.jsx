import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={`container flex flex-ai-center flex-jc-sb`}>
        <Link href="/">
          <Image
            src="/images/logo.png"
            className={styles.logo}
            alt="logo home"
            width={48}
            height={48}
          />
        </Link>
        {/* <div style={{ color: 'white' }}>Menu</div> */}
        <div></div>
      </div>
    </div>
  );
};

export default Header;
