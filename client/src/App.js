import React, { Component } from 'react';
import logo from './assets/images/shorthand.png';
import './App.css';
import Customers from './components/customers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Countdown Timer</h1>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;
