import { Component } from 'react';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <>
        <header className={styles.searchbar}>
          <form className={styles.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles.button}>
              <span className={styles.buttonLabel}>Search</span>
            </button>

            <input
              className={styles.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </form>
        </header>
      </>
    );
  }
}
