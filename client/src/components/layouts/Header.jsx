import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import "./Header.css"

const Header = (props) => {
  
  const { branding, active } = props;
  
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
				
				{
					(active === "home")
					&&
					(
						<li className="nav-item active">
							<Link to = "/home">
								<a className="nav-link" href="#">
									<span className = "fa fa-home mx-2"></span>
									<span className = "active-link">Home</span>
									<span className="sr-only">(current)</span>
								</a>
							</Link>
						</li>
					)
				}

				{
					(active !== "home")
					&&
					(
						<li className="nav-item active">
							<Link to = "/home">
								<a className="nav-link" href="#">
									<span className = "fa fa-home mx-2"></span>
									<span className = "">Home</span>
									<span className="sr-only">(current)</span>
								</a>
							</Link>
						</li>
					)
				}
				
				{
					active === "register" && 
					(
						<li className="nav-item">
							<Link to = "/register">
								<a className="nav-link" href="#">
									<span className = "active-link">Register</span>
								</a>
							</Link>
						</li>
					)
				}
				{
					active === "login" && 
					(
						<li className="nav-item">
							<Link to = "/login">
								<a className="nav-link" href="#">
									<span className = "active-link">Login</span>
								</a>
							</Link>
						</li>
					)
				}

{
					!(active === "register") && 
					(
						<li className="nav-item">
							<Link to = "/register">
								<a className="nav-link" href="#">
									<span className = "">Register</span>
								</a>
							</Link>
						</li>
					)
				}
				{
					!(active === "login") && 
					(
						<li className="nav-item">
							<Link to = "/login">
								<a className="nav-link" href="#">
									<span className = "">Login</span>
								</a>
							</Link>
						</li>
					)
				}

				
				
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