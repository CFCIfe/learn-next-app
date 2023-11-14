import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/home.module.css";
import Banner from "@/components/banner";
import Card from "@/components/card";

import eateriesStoresData from "../data/eatery-stores.json";

export async function getStaticProps(context) {
  let eateryStore = [];
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3G9daS2FsnTBVjq5QhuufnW1npkh7wyklAR/rAS+9cB8=",
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=Restaurants&ll=6.595770%2C3.337080",
    options
  );

  const data = response.json();
  console.log(data);

  return {
    props: {
      eateriesStores: eateryStoreData,
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
        {props.eateriesStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Ikeja Restaurants</h2>
            <div className={styles.cardLayout}>
              {props.eateriesStores.map((eateriesStore) => {
                return (
                  <Card
                    key={eateriesStore.id}
                    name={eateriesStore.name}
                    image={eateriesStore.imgUrl}
                    href={`/eatery-stores/${eateriesStore.id}`}
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
