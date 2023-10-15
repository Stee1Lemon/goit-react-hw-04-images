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
    setError(false);
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

// export class App extends Component {
//   state = {
//     imagesToFind: '',
//     currentPage: 1,
//     imagesToRender: [],
//     totalHits: 0,
//     isLoaded: false,
//     error: false,
//     messageNotFound: false,
//     modalOpen: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { imagesToFind, currentPage } = this.state;

//     if (
//       prevState.imagesToFind !== imagesToFind ||
//       prevState.currentPage !== currentPage
//     ) {
//       try {
//         this.setState({ isLoaded: true, error: false, messageNotFound: false });
//         const data = await fetchImages(imagesToFind, currentPage);
//         if (!data.totalHits) {
//           this.setState({
//             messageNotFound: true,
//           });
//           return;
//         }

//         this.setState(prev => {
//           return {
//             imagesToRender: [...prev.imagesToRender, ...data.hits],
//             totalHits: data.totalHits,
//           };
//         });
//       } catch (error) {
//         this.setState({ error: true });
//       } finally {
//         this.setState({ isLoaded: false });
//       }
//     }
//   }

//   openModal = imgUrl => {
//     this.setState({ modalOpen: imgUrl });
//   };

//   closeModal = () => {
//     this.setState({ modalOpen: false });
//   };

//   handlePictures = query => {
//     this.setState({
//       imagesToFind: query,
//       imagesToRender: [],
//       currentPage: 1,
//       totalHits: 0,
//     });
//   };

//   handleMorePictures = () => {
//     this.setState(prevState => {
//       return { currentPage: prevState.currentPage + 1 };
//     });
//   };

//   render() {
//     const {
//       imagesToRender,
//       isLoaded,
//       error,
//       messageNotFound,
//       modalOpen,
//       totalHits,
//     } = this.state;
//     return (
//       <div className={styles.App}>
//         <Searchbar onSubmit={this.handlePictures} />
//         {isLoaded && <Loader />}
//         {messageNotFound && <NotFoundMessage />}
//         {error && <ErrorMassage />}
//         {imagesToRender && (
//           <ImageGallery images={imagesToRender} openModal={this.openModal} />
//         )}
//         {modalOpen && <Modal imgUrl={modalOpen} closeModal={this.closeModal} />}
//         {!isLoaded && imagesToRender.length !== totalHits && (
//           <ButtonMore morePictures={this.handleMorePictures} />
//         )}
//       </div>
//     );
//   }
// }
