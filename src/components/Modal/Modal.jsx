import { useEffect } from 'react';
import styles from './Modal.module.css';

export function Modal({ imgUrl, closeModal }) {
  useEffect(() => {
    function escClose(e) {
      if (e.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', escClose);
    return () => {
      window.removeEventListener('keydown', escClose);
    };
  }, [closeModal]);

  function handleClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  );
}
