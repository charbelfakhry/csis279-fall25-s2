import React, { useState } from 'react';

const ListGroup = () => {

    
    
    const fillDummyData = () =>{
        let arr = [];
        for(let i = 0; i < 20; i++)
        {
            arr.push(`item ${i}`);
        }
        return arr;
    }


    const [selected, setSelected] = useState("");
    const handlClick = (item) =>{
        setSelected(item);
    }
    return (
        <>
            <ul className="list-group">
                {
                    fillDummyData().map((item, index)=>{
                        return(
                            <li key={index} 
                            className={(selected === item)? "list-group-item active" : "list-group-item"} 
                            onClick={()=>handlClick(item)}>{item}</li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default ListGroup;