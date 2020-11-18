import React from 'react'
import posterImg from '../../Assets/img/poster.png'
import bgImg from '../../Assets/img/posters/1.jpg'

export default function Poster() {
    return (
        <div>
            <div style={{backgroundColor:"rgba(0, 0, 0, 0.3)", width:"115px", height:"195px", padding:"5px", margin:"5px", marginTop:"4vh"}} className="posterContainer">
                
               <span>Title</span> <br/>
                <img  src={posterImg}  width="113" height="168" />
               
            </div>
        </div>
    )
}
