import React from 'react';
import TableHead from './TableHead'
import TableBodyForLecturerManageStudent from './TableBodyForLecturerManageStudent'
import TableBodyForLecturerManageCourse from './TableBodyForLecturerManageCourse'
import "./Table.css"

export default function TableDataForLecturerManageCourse({data,theads, indexes, handleLecture}) {

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
                <TableBodyForLecturerManageCourse handleLecture = {handleLecture} data = {data} indexes = {indexes} />
            </tbody>
        </table>
    </>
  );

}
