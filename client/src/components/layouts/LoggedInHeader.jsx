import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const LoggedInHeader = (props) => {
  
  const { branding, username } = props;
  
  const logout = () => {

	  if(localStorage.getItem('s-token')){
		localStorage.removeItem('s-token')
	  }

	  if(localStorage.getItem('a-token')){
		localStorage.removeItem('a-token')
	  }

	  if(localStorage.getItem('l-token')){
		localStorage.removeItem('l-token')
	  }
	  
  }

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
                    <Link className="nav-link" to = "/home">
						Home
                        	<span className="sr-only">(current)</span>
                        
                    </Link>
				</li>
				<li className="nav-item">
                    <Link to = "/home">
						<button onClick = {logout} className="nav-link btn btn-sm btn-primary p-2"><i className = "fa fa-sign-out-alt" />
                        	<span className="ml-2">Logout</span>
                        </button>
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