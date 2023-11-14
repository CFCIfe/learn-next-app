import classnames from "classnames";

import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css";

const Card = (props) => {
  return (
    <Link className={styles.cardLink} href={props.href}>
      <div className={classnames("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            alt="eatery-stores-image"
            className={styles.cardImage}
            src={props.image}
            width={260}
            height={160}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
