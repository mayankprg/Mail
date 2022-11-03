import React, {useContext, useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/authContext';
import HeaderCSS from './header.module.css'
import { useLocation } from 'react-router-dom';
import 'material-icons/iconfont/material-icons.css';

const Header = () => {

	const {user, logout} = useContext(AuthContext);
	const location = useLocation();
	const currentUrl = location.pathname;
	const [active, setActive] = useState(false);

	const [windowSize, setWindowSize] = useState(getWindowSize());
	

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener('resize', handleWindowResize);

		return () => {
		window.removeEventListener('resize', handleWindowResize);
		};
	}, []);




	function getWindowSize() {
	const {innerWidth, innerHeight} = window;
	return {innerWidth, innerHeight};
	}

	useEffect(()=>{
		if (windowSize.innerWidth > 900){
			setActive(false);
		}
	},[windowSize.innerWidth]);




	return (
		!user ? 
		<div></div> :

		<div 
			className={`${HeaderCSS["header-div"]} ${active? HeaderCSS.open :null}`}>
			
			<div className={HeaderCSS['grid-container']}>
				<div className={HeaderCSS["top-nav"]}>
					<h1 className={HeaderCSS.heading}>Mails</h1>
					<button
						className={HeaderCSS.link}
						onClick={()=>{active? setActive(false): setActive(true)}}>
						<span className="material-icons">
							format_list_bulleted
						</span> 
					</button>
				</div>
			
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
				<div className={`${HeaderCSS["grid-item"]}`}>
					<div className={`${HeaderCSS['header-btn']}`}>
						<button
							className={HeaderCSS.button}
							onClick={logout}>
							Logout
						</button>
					</div>
				</div>
				
			</div>
		</div>

	)
}

export default Header;