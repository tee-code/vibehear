import React, { Component } from 'react'
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Homepage from "./Homepage/Homepage"



export default class IndexPage extends Component {
  render() {
    return (
      <>
        <div>
          <Header branding = "ibeHear" />
          <div className = "container">
            <Homepage />
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
