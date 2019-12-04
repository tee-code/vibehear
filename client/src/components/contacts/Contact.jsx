import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from "../../Context";

class Contact extends Component {

	state = {
		showContactInfo: false
	}


	toggleContactInfo = () => {
		this.setState({ showContactInfo: !this.state.showContactInfo });
	}

	onDeleteClick = (id,dispatch) => {
		const action = { type: "DELETE_CONTACT", payload: id };
		dispatch(action);
	}

	render() {
		
		const { showContactInfo } = this.state;
		const { id, name, email, phone } = this.props.contacts;

		return(
			<Consumer>
				{(value) => {
					
					const { dispatch } = value;
					return (
						<div className = "card card-body mb-3">
							<h4>
								{name} 
								<i 
									className="fas fa-sort-down" 
									onClick = {this.toggleContactInfo}
									style = {{ cursor: "pointer" }}
								/>
								<i 
									className="fas fa-times" 
									onClick = {this.onDeleteClick.bind(this,id,dispatch)}
									style = {{ 
											color: "red", cursor: "pointer",
											float: "right"
										}}
								/>
							</h4>
							{ showContactInfo &&
								(
									<ul className = "list-group">
										<li className = "list-group-item">{email}</li>
										<li className = "list-group-item">{phone}</li>
									</ul>
								)
							}
						</div>
					)
				}}
			</Consumer>
		)
	}
}

Contact.propTypes = {
	contacts: PropTypes.object.isRequired,
	
}

export default Contact;