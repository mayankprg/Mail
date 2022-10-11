
import AppCSS from  './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/loginPage';
import Inbox from './pages/InboxPage'
import React from 'react'
import {AuthProvider} from './context/authContext';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './components/header';
import ComposePage from './pages/composePage';
import ArchivedPage from './pages/archivedPage';
import PrivateRoute from './utils/privateRoute';
import RegisterPage from './pages/registerPage';
import SentPage from './pages/sentPage'
import { EmailProvider } from './context/emailContext';
import EmailPage from './pages/emailPage';

export const App = () => {


  return (
    <div>
      
      <div className={AppCSS['App']}>
      
        <Router>
          <AuthProvider>
            <EmailProvider>
              <div className={AppCSS['emails-div']}>
              
                  <Header />
                  <Routes>
                      <Route path="/"
                        element={
                          <PrivateRoute> 
                            <Inbox/>
                          </PrivateRoute> 
                        }/>
                      <Route path="/email/:id"
                        element={
                          <PrivateRoute> 
                            <EmailPage/>
                          </PrivateRoute> 
                      }/>
                      <Route exact path="/login" element={<LoginPage/>}  />
                      <Route path="/compose" 
                        element={ 
                          <PrivateRoute> 
                            <ComposePage/>
                          </PrivateRoute> 
                        }/>
                          <Route path="/sent" 
                        element={ 
                          <PrivateRoute> 
                            <SentPage/>
                          </PrivateRoute> 
                        }/>
                      <Route path="/archived"
                      element={
                        <PrivateRoute> 
                          <ArchivedPage/> 
                        </PrivateRoute> 
                      }/>
                      <Route exact path="/register" element={<RegisterPage/>}  />
                  </Routes>
              </div>  
              </EmailProvider>
          </AuthProvider>
        </Router>
        </div>
     
       
    </div>
      
    
   
  )
}

export default App;