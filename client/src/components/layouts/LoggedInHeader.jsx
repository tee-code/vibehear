import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const LoggedInHeader = (props) => {
  
  const { branding, username } = props;


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
			<ul className="navbar-nav ml-auto">
				<li className="nav-item active">
                    <Link to = "/home"><a className="nav-link" href="#">Home
                        <span className="sr-only">(current)</span>
                    </a>
                    </Link>
				</li>
                <li style = {{ background: "#910A09", opacity: "0.7" }} className="nav-item">
                    <Link to = "/home"><a className="nav-link" href="#">Welcome! {username}
                        <span className="sr-only">(current)</span>
                    </a>
                    </Link>
				</li>
				
				
			</ul>
			</div>
		</div>
</nav>

  )
}

LoggedInHeader.defaultProps = {
	branding: "My App"
}

LoggedInHeader.propTypes = {
	branding: PropTypes.string.isRequired
}


export default LoggedInHeader;