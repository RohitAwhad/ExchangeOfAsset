import React, { Component } from 'react'
import {
  Grid, Label, Icon, Transition
} from 'semantic-ui-react'

import WalletInfo from "../Wallet/WalletInfo"

import styles from './container.module.css'


export default class StickyLayout extends Component {
  state = { visible: true }

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))

  render() {
    const { visible } = this.state

    return (
      <div className={styles.contentStyle}>
        <h1>Hellooo</h1>
      </div>



    )
  }
}
