import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './searchbar.module.css';

function Searchbar({ disabled, onSubmit }) {
  const [searchWord, setSearchWord] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ searchWord });
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button
          type="submit"
          disabled={disabled}
          className={styles.SearchFormButton}
        >
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={({ target }) => setSearchWord(target.value)}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchWord}
        />
      </form>
    </header>
  );
}

export default memo(Searchbar);

Searchbar.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
