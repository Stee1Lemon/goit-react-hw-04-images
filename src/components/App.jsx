import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorMassage } from './Error/Error';
import { NotFoundMessage } from './NotFoundMessage/NotFoundMessage';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Api/Api-services';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesToRender, setImagesToRender] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [noImagesFound, setNoImagesFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;
    setIsLoaded(true);
    setError(false);

    async function fetchData() {
      try {
        const data = await fetchImages(query, page);
        if (!data.totalHits) {
          setNoImagesFound(true);
          return;
        }
        setTotalHits(data.totalHits);
        setImagesToRender(prev => [...prev, ...data.hits]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoaded(false);
      }
    }

    fetchData();
  }, [query, page]);

  const openModal = imgUrl => {
    setModalOpen(imgUrl);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePictures = query => {
    setNoImagesFound(false);
    setQuery(query);
    setImagesToRender([]);
    setPage(1);
    setTotalHits(0);
  };

  const handleMorePictures = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handlePictures} />
      {isLoaded && <Loader />}
      {noImagesFound && <NotFoundMessage />}
      {error && <ErrorMassage />}
      {imagesToRender && (
        <ImageGallery images={imagesToRender} openModal={openModal} />
      )}
      {modalOpen && <Modal imgUrl={modalOpen} closeModal={closeModal} />}
      {!isLoaded && imagesToRender.length !== totalHits && (
        <ButtonMore morePictures={handleMorePictures} />
      )}
    </div>
  );
}
