import React from 'react';
import TableHead from './TableHead'
import TableBodyForLecturerManageStudent from './TableBodyForLecturerManageStudent'
import "./Table.css"

export default function TableDataForLecturerManageStudent({data,theads, indexes, handleView}) {

  return (
    <>
        <table className="myTable table">
            <thead>
                <tr>
                    <th>SN</th>
                    <TableHead theads = {theads}/>
                </tr>
            </thead>
            <tbody>
                <TableBodyForLecturerManageStudent handleView = {handleView} data = {data} indexes = {indexes} />
            </tbody>
        </table>
    </>
  );

}
