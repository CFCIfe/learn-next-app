import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner";

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("Banner Button");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image-1.png"
            alt="hero-image"
            width={700}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
