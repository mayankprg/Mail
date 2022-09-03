import React from 'react'
import { Link } from "react-router-dom";


const Header = () => {

  return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inbox</Link>
            </li>
            <li>
              <Link to="/compose">compose</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/archived">Archived</Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Header