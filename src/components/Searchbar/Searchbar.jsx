import { useState } from 'react';
import styles from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <>
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
        </form>
      </header>
    </>
  );
}
