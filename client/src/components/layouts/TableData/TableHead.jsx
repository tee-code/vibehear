import React from 'react'

export default function TableHead({theads}){

    return (
        theads.map((thead,index) => {
            return (
                <th key = {index}>{thead}</th>
            )
        })
    )
}
