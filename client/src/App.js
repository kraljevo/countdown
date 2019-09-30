import React, { Component } from 'react';
import logo from './assets/images/shorthand.png';
import './App.css';
import Countdown from './components/countdown.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Countdown Timer</h1>
        </header>
        <Countdown />
      </div>
    );
  }
}

export default App;
