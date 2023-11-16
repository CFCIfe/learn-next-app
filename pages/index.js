import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/home.module.css";
import Banner from "@/components/banner";
import Card from "@/components/card";
import { fetchEateryStores } from "@/lib/eatery-stores";

import useTrackLocation from "@/hooks/use-track-location";
import { useEffect, useState } from "react";

export async function getStaticProps(context) {
  const eateryStores = await fetchEateryStores();

  return {
    props: {
      eateryStores,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, latlong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

    const [eateryStores, setEateryStores] = useState("");
    const [eateryStoresError, setEateryStoresError] = useState(null);

    console.log({ latlong, locationErrorMsg });

    useEffect(() => {
      async function setEateryStoresByLocation() {
        if (latlong) {
          try {
            const fetchedEateryStores = await fetchEateryStores(latlong, 10);
            console.log({ fetchedEateryStores });
            setEateryStores(fetchedEateryStores);
          } catch (error) {
            console.log({ error });
            setEateryStoresError(error.message);
          }
        }
      }
      setEateryStoresByLocation();
    }, [latlong]);

    const handleOnBannerBtnClick = () => {
      handleTrackLocation();
      console.log("button clicked");
    };

    return (
      <div className={styles.container}>
        <Head>
          <title>Check Eateries</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.main}>
          <Banner
            buttonText={
              isFindingLocation ? "Locating..." : "View stores nearby"
            }
            handleOnClick={handleOnBannerBtnClick}
          />
          {locationErrorMsg && <p> Something went wrong: {locationErrorMsg}</p>}
          {eateryStoresError && (
            <p> Something went wrong: {eateryStoresError}</p>
          )}
          <div className={styles.heroImage}>
            <Image
              src="/static/hero-image-1.png"
              alt="hero-image"
              width={700}
              height={400}
            />
          </div>
          {eateryStores.length > 0 && (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Restaurants Near Me</h2>
              <div className={styles.cardLayout}>
                {eateryStores.map((eateryStore) => {
                  return (
                    <Card
                      key={eateryStore.id}
                      name={eateryStore.name}
                      image={
                        eateryStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/eatery-stores/${eateryStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {props.eateryStores.length > 0 && (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Ikeja Restaurants</h2>
              <div className={styles.cardLayout}>
                {props.eateryStores.map((eateryStore) => {
                  return (
                    <Card
                      key={eateryStore.id}
                      name={eateryStore.name}
                      image={
                        eateryStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/eatery-stores/${eateryStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
