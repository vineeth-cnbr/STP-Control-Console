import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from './Navbar';
import Login from './login';
import Status from './Status';
import 'semantic-ui-css/semantic.min.css';
import './index.css'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default App;
