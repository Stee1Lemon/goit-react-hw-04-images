import styles from './Button.module.css';

export const ButtonMore = ({ morePictures }) => {
  return (
    <div className={styles.loadMoreContainer}>
      <button type="button" className={styles.button} onClick={morePictures}>
        Load more
      </button>
    </div>
  );
};
