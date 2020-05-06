import React from 'react';
import TableBodyData from './TableBodyData'
import axios from 'axios'
import { BASE_URL } from '../../../Config'
import { Redirect, Link } from 'react-router-dom'


const setData = (label,data) => {
  localStorage.setItem(label,JSON.stringify(data));
}

const getData = (label) => {
  return JSON.parse(localStorage.getItem(label))
}

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

let id;
const deleteIt = async (e) => {
    id = e.target.id;
    console.log(id);
    let userType = JSON.parse(localStorage.getItem('entity')).type;

    // try {

    //     const res = await axios.delete(`${BASE_URL}/${userType}/${id}`);
    //     console.log(res.data);
    //     document.querySelectorAll(".deleteRecord")[0].innerHTML = "Deleted Successfully!"
    //     document.querySelector("#deleteMessage").innerHTML = "Thanks. Kindly click the close button."
    //     clearIt();
    // } catch (error) {
    //     console.log(error);
    // } 
}
const deleteRecord = async (e) => { 
    
    if(JSON.parse(localStorage.getItem('a-token')).role === "Super Admin"){
        deleteIt(e);
        if(JSON.parse(localStorage.getItem('a-token'))._id !== id){
            deleteIt(e);
        }else{
            document.querySelector('#deleteError').style.display = "Block";
            document.querySelector('#deleteErrorMessage').innerHTML = "Sorry! You cant delete yourself.";
        }
    }else{
        document.querySelector('#deleteError').style.display = "Block";
        document.querySelector('#deleteErrorMessage').innerHTML = "Sorry! You cannot delete. Meet the Super Admin. Thanks.";
    }

    
    

}

export default function TableBodyForStudentManageCourse({data,indexes,handleLecture}){
    
    return (
        data.map((row,index) => {
            
            return (
                <tr key = {index} name = {row._id}>
                    <th key = {index} scope = "row">{index+1}</th>
                    <TableBodyData indexes = {indexes} fields = {row}/>
                    <td className = "actions" key = {index+11}>
                       
                        <i onClick = {handleLecture} id = {JSON.stringify(row)} className = "icons fa fa-school p-2">

                        </i>
                        
                        <div style = {{ "display": "none" }} id = "deleteError" class="alert alert-warning alert-dismissible fade show" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <strong id = "deleteErrorMessage"></strong>
                        </div>
                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <button onClick = {deleteRecord} id = {row._id} type="button" className="btn btn-primary">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <i className = "icons fa fa-eye"></i>
                    </td>
                </tr>
            )
        })
    )
    
}
