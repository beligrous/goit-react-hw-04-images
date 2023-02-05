import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

function ImageGalleryItem({ url, title, onClick }) {
  return (
    <li className={styles.ImageGalleryItem} onClick={onClick}>
      <img className={styles.ImageGalleryItemImage} src={url} alt={title} />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
