import React, { Component } from 'react';
import AppNavbar from './components/AppNavBar';
import MasterList from './components/MasterList';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <MasterList />
          </Container>
        </div>
      </Provider>
    )
  }
};