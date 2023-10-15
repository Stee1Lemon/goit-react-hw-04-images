import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webFormatUrl,
  largeImageURL,
  openModal,
}) => {
  return (
    <li className={styles.galleryItem}>
      <img
        className={styles.galleryItemImage}
        src={webFormatUrl}
        alt="is was here"
        onClick={() => openModal(largeImageURL)}
      />
    </li>
  );
};
