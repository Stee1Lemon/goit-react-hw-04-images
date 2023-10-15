import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(img => {
        return (
          <ImageGalleryItem
            key={img.id}
            webFormatUrl={img.webformatURL}
            largeImageURL={img.largeImageURL}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
};
