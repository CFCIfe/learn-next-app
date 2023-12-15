import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import classNames from "classnames";

import { fetchEateryStores } from "@/lib/eatery-stores";
import styles from "@/styles/eatery-stores.module.css";

import { useContext, useState, useEffect } from "react";

import { StoreContext } from "@/store/store-context";

import { isEmpty } from "@/utils";

export async function getStaticProps(context) {
  const params = context.params;

  const eateryStores = await fetchEateryStores();

  const findEateryStoreById = eateryStores.find((store) => {
    return store.id === params.id;
  });

  return {
    props: {
      eateryStore: findEateryStoreById ? findEateryStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const eateryStores = await fetchEateryStores();
  const paths = eateryStores.map((eateryStore) => {
    return {
      params: { id: eateryStore.id },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const EateryStore = (initialProps) => {
  const router = useRouter();

  const id = router.query.id;

  const [eateryStore, setEateryStore] = useState(initialProps.eateryStore);

  const {
    state: { eateryStores },
  } = useContext(StoreContext);

  const handleCreateEateryStore = async (eateryStore) => {
    try {
      const { id, name, voting, imgUrl, neighborhood, address } = eateryStore;
      const response = await fetch("/api/createEateryStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          imgUrl,
          neighborhood: neighborhood || "",
          address: address || "",
        }),
      });

      const dbEateryStore = await response.json();
      console.log({ dbEateryStore });
    } catch (error) {
      console.log("Error creating eatery store", error);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.eateryStore)) {
      if (eateryStores.length > 0) {
        const eateryStoreFromContext = eateryStores.find((eateryStore) => {
          return eateryStore.id.toString() === id;
        });
        if (eateryStoreFromContext) {
          setEateryStore(eateryStoreFromContext);
          handleCreateEateryStore(eateryStoreFromContext);
        }
      }
    } else {
      // SSG
      handleCreateEateryStore(initialProps.eateryStore);
    }
  }, [id, eateryStores, initialProps.eateryStore]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, neighborhood, name, imgUrl } = eateryStore;

  const [votingCount, setVotingCount] = useState(1);

  const handleUpvoteButton = () => {
    console.log("Upvote button clicked");
    let count = votingCount + 1;
    setVotingCount(count);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/" className={styles.link}>
              ← Back to home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt="eateries picture"
            width={550}
            height={600}
            className={styles.storeImg}
          />
        </div>
        <div className={classNames("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="Icons"
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="Icons"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/stars.svg"
              width="24"
              height="24"
              alt="Icons"
            />
            <p className={styles.text}>{votingCount}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default EateryStore;
