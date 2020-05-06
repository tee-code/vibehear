import React from 'react';
import './LeftSideBar.css';
import { Link } from 'react-router-dom';
import uuid4 from 'uuid/v4';

export default function LeftSideBar(props) {

  let isClicked = false
  
  const handleToggle = () => {
      isClicked = !isClicked
      if(isClicked){
        window.document.getElementById('wrapper').className = "d-flex toggled"
      }else{
        window.document.getElementById('wrapper').className = "d-flex"
      }
      
  }

  return (
    <>
        <div className="app-dashboard" id="sidebar-wrapper">
            <div className="sidebar-heading">  {props.name} Dashboard 
                <span onClick = {handleToggle} className = "fa ml-2 fa-bars"></span>
            </div>
                <div className="list-group list-group-flush">
                    { props.data.map((each) => {
                      if(each.code){
                        return (
                          <a key = {uuid4()} onClick = {each.action} className="list-group-item list-group-item-action "><span key = {uuid4()} className = "fa fa-book mr-2 "></span>{each.name}</a>
                        )
                      }else{
                        return (
                          <a key = {uuid4()} onClick = {each.action} className="list-group-item list-group-item-action "><span key = {uuid4()} className = "fa fa-cogs mr-2 "></span>{each.name}</a>
                        )
                      }
                    })}
                    
                </div>
            </div>
            <button onClick = {handleToggle} 
              className = "toggleSideBar btn btn-md btn-secondary m-2">
                <i key = {uuid4()} onClick = {handleToggle} className = "fa fa-arrow-right" />
            </button>
            
                
           
    </>
  );
}
