import React, { Component } from 'react'
import { Image, Container } from 'semantic-ui-react';
import styles from './footer.module.css';

export default class Footer extends Component {
  render() {
    return (
      <Container>
        <footer className={styles.footer}>
          <div className={styles.created}>
            Created by
          </div>
          <div className={styles.copyright}>Whitewalkers</div>
        </footer>
      </Container>
    )
  }
}
