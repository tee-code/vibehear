import React from 'react';
import "./Homepage.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
        
        <div className="card-container container-fluid">
            <div className="app-card card border-0 shadow my-5">
                <div className="app-card-body card-body text-center p-4 text-white">
                    
                    <span style = {{ fontSize: "55px", fontWeight: "bolder", fontFamily: "Segoe UI" }}>VIBEHEAR</span>
                    
                    <p 
                      style = {{ fontSize: "30px", fontWeight: "bold", fontFamily: "Segoe UI" }}
                      className="lead mt-2">A Virtual Classroom for Deaf & Dumb.</p>
                    <div class="container">
                      <div id="carouselContent" class="carousel slide" data-ride="carousel">
                          <div class="carousel-inner" role="listbox">
                              <div class="carousel-item text-center p-4">
                                  <p>Now, a deaf and dumb can talk! Asking of quetions in a classroom now made easy</p>
                              </div>
                              <div class="carousel-item active text-center p-4">
                                  <p>It ensures effficient communication between Lecturer and (Deaf and Dumb)</p>
                              </div>
                              <div class="carousel-item text-center p-4">
                                  <p>It transcribes the speech of the lecturer to a readable text</p>
                              </div>
                              <div class="carousel-item text-center p-4">
                                  <p>It can be used as a note-taking app</p>
                              </div>
                              <div class="carousel-item text-center p-4">
                                  <p>It eases the classroom learning effort for the deaf and dumb.</p>
                              </div>
                              <div class="carousel-item text-center p-4">
                                  <p>It provides a better user interface that is more friendly for the deaf and dumb.</p>
                              </div>
                              <div class="carousel-item text-center p-4">
                                  <p>Download a class lecture as PDF.</p>
                              </div>
                          </div>
                          <a class="carousel-control-prev" href="#carouselContent" role="button" data-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="sr-only">Previous</span>
                          </a>
                          <a class="carousel-control-next" href="#carouselContent" role="button" data-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="sr-only">Next</span>
                          </a>
                      </div>
                  </div>
                  <br/><br/>
                    <Link to = "/register"><button
                    style = {{ background: "red", opacity: "0.9" }} 
                    className="btn btn-lg bg-teal text-white"
                    
                    >Register</button></Link>
                </div>
            </div>
        </div>
       
    </>
  );
}
