import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/home.module.css";
import Banner from "@/components/banner";
import Card from "@/components/card";
import { fetchEateryStores } from "@/lib/eatery-stores";

export async function getStaticProps(context) {
  const eateryStores = await fetchEateryStores();

  return {
    props: {
      eateryStores,
    },
  };
}

export default function Home(props) {
  const handleOnBannerBtnClick = () => {
    console.log("Banner Button");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Eatery Connoisseur</title>
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
        {props.eateryStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Ikeja Restaurants</h2>
            <div className={styles.cardLayout}>
              {props.eateryStores.map((eateryStore) => {
                return (
                  <Card
                    key={eateryStore.fsq_id}
                    name={eateryStore.name}
                    // image={eateryStore.icon.prefix + eateryStore.icon.suffix}
                    href={`/eatery-stores/${eateryStore.fsq_id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
