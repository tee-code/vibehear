import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import "./Header.css"

const Header = (props) => {
  
  const { branding } = props;

  return (
	<nav 
		className="app-navbar navbar navbar-expand-lg navbar-dark static-top mb-5 shadow">
		<div className="container app-container">
			<a className="navbar-brand" href="#">
				
				<span className = "v-logo">V</span> 
				{branding}
				
				</a>

				
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarResponsive">
			<ul className="navbar-nav ml-auto text-white">
				<li className="nav-item active">
				<Link to = "/home"><a className="nav-link" href="#">Home
					<span className="sr-only">(current)</span>
				</a>
				</Link>
				</li>
				<li className="nav-item">
					<Link to = "/register"><a className="nav-link" href="#">Register</a>
					</Link>
				</li>
				
				<li className="nav-item">
					<Link to = "/login"><a className="nav-link" href="#">Login</a></Link>
				</li>
				
			</ul>
			</div>
		</div>
</nav>

  )
}

Header.defaultProps = {
	branding: "My App"
}

Header.propTypes = {
	branding: PropTypes.string.isRequired
}


export default Header;