import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/authContext';
import HeaderCSS from './header.module.css'


const Header = () => {

  let {user} = useContext(AuthContext);


 
  return (
    
    
    !user ? 
    <div>
      
    </div> :

	<div className={HeaderCSS["header-div"]}>
		<div className={HeaderCSS['grid-container']}>
			
			<div className={HeaderCSS['grid-item']}>
				<Link to="/">Inbox</Link>
			</div>
			<div className={HeaderCSS['grid-item']}>
				<Link to="/compose">Compose</Link>
			</div>
			<div className={HeaderCSS['grid-item']}>
				<Link to="/sent">Sent</Link>
			</div>
			<div className={HeaderCSS['grid-item']}>
				<Link to="/archived">Archived</Link>
			</div>
		</div>
	</div>
  )
}

export default Header;