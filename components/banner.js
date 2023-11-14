import styles from './banner.module.css'

const Banner = (props) => {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.title1}>Eateries in</span>
          <span className={styles.title2}>Lagos</span>
        </h1>
        <p className={styles.subtitle}> Discover your local eateries shops!</p>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={props.handleOnClick}>
            {props.buttonText}
          </button>
        </div>
      </div>
    );
}

export default Banner