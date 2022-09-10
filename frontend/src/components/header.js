import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/authContext';
import './header.css'

const Header = () => {

  let {user, logout} = useContext(AuthContext);
 
  return (
    
    !user ? <div> Mail</div> :
    <div>
        <nav>
          <ul className='header-nav'>
            <li>
              <Link to="/">Inbox</Link>
            </li>
            <li>
              <Link to="/compose">compose</Link>
            </li>
            <li>
              <a href='#' onClick={logout}>Logout</a>
            </li>
            <li>
              <Link to="/archived">Archived</Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Header;