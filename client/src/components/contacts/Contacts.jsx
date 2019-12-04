/* eslint-disable no-undef */
import React, { PureComponent } from 'react'
import Contact from "./Contact"
import { Consumer } from "../../Context";

class Contacts extends PureComponent {

    render() {

        return ( 
            <Consumer>

                {
                    (value) => {
                        const { contacts } = value;
                        return ( 
                            <> 
                                {
                                    contacts.map((contact) =>
                                        <
                                        Contact key = { contact.id }
                                        contacts = { contact }
                                        />
                                    )
                                } 
                            </>
                        )
                    }
                } 
            </Consumer>
        )

    }
}


export default Contacts;