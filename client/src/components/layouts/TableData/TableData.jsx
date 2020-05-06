import React from 'react';
import TableHead from './TableHead'
import TableBody from './TableBody'
import "./Table.css"

export default function TableData({data,theads, indexes, onDeleteHandler, onViewHandler, onEditHandler, state}) {
    
  return (
    <>
        <table className="myTable table table-response-md">
            <thead>
                <tr>
                    <th>SN</th>
                    <TableHead theads = {theads}/>
                </tr>
            </thead>
            <tbody>
                <TableBody data = {data} indexes = {indexes} onEditHandler = {onEditHandler} onViewHandler = {onViewHandler} onDeleteHandler = {onDeleteHandler} state = {state}/>
            </tbody>
        </table>
    </>
  );

}
