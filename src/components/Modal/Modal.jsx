import { Component } from 'react';
import styles from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escClose);
  }

  escClose = e => {
    if (e.key === 'Escape') this.props.closeModal();
  };

  handleClick = e => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };

  render() {
    const { imgUrl } = this.props;

    return (
      <div className={styles.overlay} onClick={this.handleClick}>
        <div className={styles.modal}>
          <img src={imgUrl} alt="" />
        </div>
      </div>
    );
  }
}
