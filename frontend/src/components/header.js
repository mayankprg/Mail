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
              <Link to="/sent">sent</Link>
            </li>
            <li>
              <button
                type="button"
                className="link-button"
                onClick={logout}
              >
              Logout
            </button>

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