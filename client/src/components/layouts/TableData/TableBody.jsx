import React from 'react';
import TableBodyData from './TableBodyData'
import axios from 'axios'
import { BASE_URL } from '../../../Config'
import AdminInfo from '../ModalData/AdminInfo';
import StudentInfo from '../ModalData/StudentInfo';
import LecturerInfo from '../ModalData/LecturerInfo';
import FacultyInfo from '../ModalData/FacultyInfo';
import DepartmentInfo from '../ModalData/DepartmentInfo';
import CourseInfo from '../ModalData/CourseInfo';
import uuid4 from 'uuid/v4'
import { Consumer } from '../../../Context';

const clearIt = () => {
    setTimeout(()=>{
        if(document.querySelectorAll(".deleteRecord")[0]){
            document.querySelectorAll(".deleteRecord")[0].innerHTML = "Delete A Record"
        }
        
        if(document.querySelector("#deleteMessage")){
            document.querySelector("#deleteMessage").innerHTML = "Are you sure you want to delete this?"
        }
        
    }, 3000)
}


const deleteIt = async (e) => {
    let id = e.target.id;
    
    let userType = JSON.parse(localStorage.getItem('entity')).type;
    

    try {

        const res = await axios.delete(`${BASE_URL}/${userType}/${id}`);
        console.log(res.data);
        document.querySelectorAll(".deleteRecord")[0].innerHTML = "Deleted Successfully!"
        document.querySelector("#deleteMessage").innerHTML = "Thanks. Kindly click the close button."
        clearIt(); 
    }catch(e){
        console.log(e);
    } 
}

const deleteRecord = async (e) => { 
    let id = e.target.id;
    if(JSON.parse(localStorage.getItem('a-token')).role === "Super Admin"){
        
        if(JSON.parse(localStorage.getItem('a-token'))._id != id){
            
            deleteIt(e);
        }else{
            console.log(JSON.parse(localStorage.getItem('a-token'))._id, id);
            document.querySelector('#deleteError').style.display = "Block";
            document.querySelector('#deleteErrorMessage').innerHTML = "Sorry! You cant delete yourself.";
        }
    }else{
        document.querySelector('#deleteError').style.display = "Block";
        document.querySelector('#deleteErrorMessage').innerHTML = "Sorry! You cannot delete. Meet the Super Admin. Thanks.";
    }

}

export default function TableBody({data,indexes,onViewHandler, onEditHandler, onDeleteHandler, state}){
    
    const entityData = JSON.parse(localStorage.getItem('entity'))
    const entity = entityData.type.toUpperCase();
    
    const { action, currentData } = state;
    
    return(
        <Consumer>
    {
        (value) => {
            return (
                data.map((row,index) => {
                    
                    return (
                        <tr key = {index} name = {row._id}>
                            <th key = {index} scope = "row">{index+1}</th>
                            <TableBodyData indexes = {indexes} fields = {row}/>
                            <td className = "actions" key = {index+11}>
                                <i 
                                    key = {uuid4()}
                                    data-toggle="modal"
                                    data-target="#viewModal"
                                    id = {JSON.stringify(row)}
                                    onClick = {onEditHandler}
                                    className = "icons fa fa-edit p-2"></i>
                                <i onClick = {onDeleteHandler} id = {JSON.stringify(row)} key = {uuid4()} data-toggle="modal" data-target="#exampleModal" className = "icons fa fa-trash p-2">
    
                                </i>
                                <div style = {{ "display": "none" }} id = "deleteError" className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <strong id = "deleteErrorMessage"></strong>
                                </div>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            
                                            
                                                <h5 className="deleteRecord modal-title" id="exampleModalLabel">
                                                    Delete A Record.
                                                </h5>    
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p id = "deleteMessage">
                                                    Are you sure you want to delete this? 
                                                </p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button onClick = {deleteRecord} id = {currentData._id} type="button" className="btn btn-primary">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="modal fade" id="viewModal" tabIndex="-1" role="dialog" aria-labelledby="viewModal" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            
                                            
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    {entity} Bio Data
                                                </h5>   
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                {
                                                    (entity == "ADMINS" && action == "VIEW") && (
                                                        <AdminInfo key = {uuid4()} data = {currentData} readOnly = {true} />
                                                    )
                                                }
                                                {
                                                    (entity == "ADMINS" && action == "EDIT") && (
                                                        <AdminInfo key = {uuid4()} data = {currentData} readOnly = {false} />
                                                    )
                                                }
                                                {
                                                    (entity == "STUDENTS" && action == "VIEW") && (
                                                        <StudentInfo key = {uuid4()} data = {currentData} readOnly = {true} />
                                                    )
                                                }
                                                {
                                                    (entity == "STUDENTS" && action == "EDIT") && (
                                                        <StudentInfo key = {uuid4()} data = {currentData} readOnly = {false} />
                                                    )
                                                }
                                                {
                                                    (entity == "LECTURERS" && action == "VIEW") && (
                                                        <LecturerInfo key = {uuid4()} data = {currentData} readOnly = {true}/>
                                                    )
                                                }
                                                {
                                                    (entity == "LECTURERS" && action == "EDIT") && (
                                                        <LecturerInfo key = {uuid4()} data = {currentData} readOnly = {false}/>
                                                    )
                                                }
                                                {
                                                    (entity == "FACULTIES" && action == "VIEW") && (
                                                        <FacultyInfo key = {uuid4()} data = {currentData} readOnly = {true}/>
                                                    )
                                                }
                                                {
                                                    (entity == "FACULTIES" && action == "EDIT") && (
                                                        <FacultyInfo key = {uuid4()} data = {currentData} readOnly = {false}/>
                                                    )
                                                }
                                                {
                                                    (entity == "DEPARTMENTS" && action == "EDIT") && (
                                                        <DepartmentInfo key = {uuid4()} data = {currentData} readOnly = {false}/>
                                                    )
                                                }
                                                {
                                                    (entity == "DEPARTMENTS" && action == "VIEW") && (
                                                        <DepartmentInfo key = {uuid4()} data = {currentData} readOnly = {true}/>
                                                    )
                                                }
                                                {
                                                    (entity == "COURSES" && action == "EDIT") && (
                                                        <CourseInfo key = {uuid4()} data = {currentData} readOnly = {false}/>
                                                    )
                                                }
                                                {
                                                    (entity == "COURSES" && action == "VIEW") && (
                                                        <CourseInfo key = {uuid4()} data = {currentData} readOnly = {true}/>
                                                    )
                                                }
                                                
                                                
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-block btn-secondary" data-dismiss="modal">Close</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i 
                                    key = {row._id}
                                    data-toggle="modal"
                                    data-target="#viewModal"
                                    id = {JSON.stringify(row)}
                                    className = "icons fa fa-eye"
                                    onClick = {onViewHandler}
                                >
                                </i>
                            </td>
                        </tr>
                    )
                })
            )
        }
        
    }
    </Consumer>
    )
    
    
}
