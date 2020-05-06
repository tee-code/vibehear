import React, { Component } from 'react';
import './Loader.css';

export default class Loader extends Component {
  render() {
    return (
      <>
        <div id = "loader" className="container loader">

        </div>
        <p>{this.props.message}</p>
      </>
    )
  }
}
