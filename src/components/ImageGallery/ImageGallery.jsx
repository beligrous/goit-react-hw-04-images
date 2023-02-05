import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './imageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ pictures, showPicture }) {
  const list = pictures.map(item => (
    <ImageGalleryItem
      key={item.id}
      url={item.webformatURL}
      title={item.tags}
      onClick={() => showPicture(item.largeImageURL)}
    />
  ));
  return <ul className={styles.ImageGallery}>{list}</ul>;
}

export default memo(ImageGallery);

ImageGallery.defaultProps = { pictures: [] };

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showPicture: PropTypes.func.isRequired,
};
