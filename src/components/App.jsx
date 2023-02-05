import { useState, useEffect, useCallback } from 'react';
import { Blocks } from 'react-loader-spinner';
import styles from './app.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import getPictures from 'api/api';
import Modal from './Modal/Modal';

function App() {
  const [pictures, setPictures] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [finish, setFinish] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(false);

  const handleSearch = ({ searchWord }) => {
    if (search !== searchWord) {
      setSearch(searchWord);
      setPage(1);
      setPictures([]);
    }
  };

  const getMorePictures = useCallback(() => {
    setPage(page => page + 1);
  }, []);

  const handlePicture = useCallback(url => {
    setShowModal(true);
    setImageURL(url);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setImageURL('');
  }, []);

  useEffect(() => {
    if (search) {
      setLoading(true);
      setSearchButtonDisabled(true);
      getPictures(search, page)
        .then(response => {
          setPictures(prevPictures => [...prevPictures, ...response.hits]);
          if (response.hits.length / page === 0) {
            setFinish(true);
          }
        })
        .catch(error => setError(error.message))
        .finally(() => {
          setLoading(false);
          setSearchButtonDisabled(false);
        });
    }
  }, [search, page]);

  const loadingSpiner = (
    <div className={styles.loading}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
      />
      <p>Loading, please wait</p>
    </div>
  );
  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} disabled={searchButtonDisabled} />
      <ImageGallery pictures={pictures} showPicture={handlePicture} />
      {loading && loadingSpiner}
      {!pictures.length && search && <p>...Sorry, no pictures </p>}
      {error && <p>{error}</p>}
      {pictures.length > 0 && finish === false && (
        <button
          className={styles.Button}
          type="button"
          onClick={getMorePictures}
        >
          Load more.
        </button>
      )}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={imageURL} alt="big" />
        </Modal>
      )}
    </div>
  );
}

export default App;
