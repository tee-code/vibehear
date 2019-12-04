import React from 'react';
import './LeftSideBar.css';
import { Link } from 'react-router-dom';

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
    <>yy
        <div className="app-dashboard" id="sidebar-wrapper">
            <div className="sidebar-heading">  {props.name} Dashboard 
                <span onClick = {handleToggle} className = "fa ml-2 fa-bars"></span>
            </div>
                <div className="list-group list-group-flush">
                    { props.data.map((each) => {
                        return (
                            <a href= {`/${each.page}`} className="list-group-item list-group-item-action "><span className = "fa fa-cogs mr-2 "></span>{each.name}</a>
                        )
                    })}
                    
                </div>
            </div>
            
            <div onClick = {handleToggle} className = "full-page text-center"><span className = "fa fa-arrow-right"></span></div>
                
           
    </>
  );
}
