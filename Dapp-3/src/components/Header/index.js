import React, {Component} from 'react'
import {
  Container,
  Image,
  Menu,
  Visibility,
  Grid, Label, Icon, Transition , Dropdown
} from 'semantic-ui-react'

import ConnectWallet from '../Wallet/ConnectWallet'
import WalletInfo from "../Wallet/WalletInfo"
import styles from '../Containers/container.module.css';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};


export default class Header extends Component {
  state = {
    menuFixed: true,
    visible : true
  };

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))


  render() {
    const {menuFixed} = this.state;
    const { visible } = this.state

    return (
     
    <div>
      
      <Visibility
      onBottomPassed={this.stickTopMenu}
      onBottomVisible={this.unStickTopMenu}
      once={false}
      >
        <Menu
        borderless
        fixed={menuFixed ? 'top' : undefined}
        style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container>
            
            <Menu.Item header>Navbar</Menu.Item>
            

            <Menu.Menu position='right'>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/user">User</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/creator">Create</Link>
              </li>
            </ul>
              <ConnectWallet/>
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>

    </div>
    )
  }
}
