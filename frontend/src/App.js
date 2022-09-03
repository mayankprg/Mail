
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/loginPage';
import Inbox from './pages/Inbox'
import React, { Component } from 'react'
import {AuthProvider} from './context/authContext';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './components/header';
import ComposePage from './pages/composePage';
import ArchivedPage from './pages/archivedPage';

export const App = () => {
  return (
    <div className='App'>
        <Router>

          <AuthProvider>
            <Header/>  
            <Routes>
                
                <Route path="/" element={<Inbox/>}  />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/compose" element={<ComposePage/>} />
                <Route path="/archived" element={<ArchivedPage/>} />
            </Routes>
          </AuthProvider>
        
        </Router>
    </div>
      
    
   
  )
}

export default App;