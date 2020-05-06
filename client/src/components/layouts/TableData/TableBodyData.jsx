import React from 'react'

export default function TableBodyData({fields,indexes}){
    
    return(
        indexes.map((each,index) => {
            if(each == "dateAdded"){
                const now = new Date(fields[each]);
                fields[each] = now.toLocaleString();
            }
            if(fields[each] !== ""){
                return (
                    <td key = {index}>{fields[each]}</td>
                )
            }else{
                return (
                    <td key = {index}>Unavailable</td>
                )
            }
            
        })
    )
    
}