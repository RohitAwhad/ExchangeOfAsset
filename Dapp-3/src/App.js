import {Web3ReactProvider} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers';

import Footer from './components/Footer';

import Content from './components/Containers';
import {Container, Image} from 'semantic-ui-react';

import './App.css';

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

function App() {
  return (
  <Web3ReactProvider getLibrary={getLibrary}>
    <div className="App">
      <Content>
        <Container text textAlign='center'>
        </Container>
      </Content>
      <Footer/>
    </div>
  </Web3ReactProvider>
  );
}

export default App;
