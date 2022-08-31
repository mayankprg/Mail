
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/loginPage';
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <LoginPage />
      </div>
    )
  }
}

