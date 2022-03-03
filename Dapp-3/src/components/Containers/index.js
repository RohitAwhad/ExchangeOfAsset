import React, { Component } from 'react'
import {
  Grid, Label, Icon, Transition
} from 'semantic-ui-react'

import WalletInfo from "../Wallet/WalletInfo"

import styles from './container.module.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import Dashboard from "../Dashboard/Dashboard";
import User from "../User/User"
import Header from '../Header';
import Creator from '../Creator/Creator';

export default class StickeyLayout extends Component {
  state = { visible: true }

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))

  render() {
    const { visible } = this.state

    return (
      <Router>
        <Header/>
          <Routes>
            <Route exact path='/' element={<Dashboard/>}></Route>
            <Route exact path='/user' element={< User />}></Route>
            <Route exact path='/creator' element={< Creator />}></Route>
      </Routes>
     
      </Router>
    )
  }
}
