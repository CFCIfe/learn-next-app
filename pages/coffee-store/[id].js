import Link from "next/link";
import { useRouter } from "next/router";
import eateriesStoresData from "../../data/eatery-stores.json";
import Head from "next/head";
import styles from "@/styles/eatery-stores.module.css";
import Image from "next/image";
import classNames from "classnames";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      eateriesStore: eateriesStoresData.find((eateriesStore) => {
        return eateriesStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = eateriesStoresData.map((eateriesStore) => {
    return {
      params: { id: eateriesStore.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const EateryStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => {
    console.log("Upvote button clicked");
  };

  const { address, name, neighbourhood, imgUrl } = props.eateriesStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/" className={styles.link}>
              Back to home
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
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="Icons"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="Icons"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/stars.svg"
              width="24"
              height="24"
              alt="Icons"
            />
            <p className={styles.text}>10</p>
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
