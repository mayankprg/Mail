import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/authContext';
import HeaderCSS from './header.module.css'
import { useLocation } from 'react-router-dom';

const Header = () => {

	let {user} = useContext(AuthContext);
	const location = useLocation();
	const currentUrl = location.pathname;
	
	return (
		!user ? 
		<div>
		
		</div> :

		<div className={HeaderCSS["header-div"]}>
			<div className={HeaderCSS['grid-container']}>
				<div className={`${HeaderCSS["grid-item"]}`}>
					<div className={`${currentUrl ==="/"? HeaderCSS["active"]: HeaderCSS['header-btn']}`}>
						<Link to="/">Inbox</Link>
					</div>
				</div>
				<div className={`${HeaderCSS["grid-item"]}`}>
					<div className={`${currentUrl ==="/compose"? HeaderCSS["active"]: HeaderCSS['header-btn']}`}>
						<Link to="/compose">Compose</Link>
					</div>
				</div>
				<div className={`${HeaderCSS["grid-item"]}`}>
					<div className={`${currentUrl ==="/sent"? HeaderCSS["active"]: HeaderCSS['header-btn']}`}>
						<Link to="/sent">Sent</Link>
					</div>
				</div>
				<div className={`${HeaderCSS["grid-item"]}`}>
					<div className={`${currentUrl ==="/archived"? HeaderCSS["active"]: HeaderCSS['header-btn']}`}>
						<Link to="/archived">Archived</Link>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Header;