import React, { useState } from 'react'
import posterImg from '../../Assets/img/poster.png'
import bgImg from '../../Assets/img/posters/1.jpg'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';




export default function Poster(props) {
    const [isOpen, setIsOpen]= useState("");
    const city= props.city;
    const location= props.location;
    const monthAndYear=props.monthAndYear;
    const genre= props.genre;
    const imageUrl=props.imageUrl;
    const name = props.name;
   
     
    return (
        <div>
            <div onClick={() =>{ setIsOpen(true); }} style={{backgroundColor:"rgba(0, 0, 0, 0.3)", width:"auto", height:"auto", padding:"5px", margin:"5px", marginTop:"4vh"}} className="posterContainer">
                 
               <span>{name}</span> <br/>
                <img  src={imageUrl?imageUrl:posterImg}  width="113" height="168" />
            </div>
            {isOpen && (
              <Lightbox
                mainSrc={imageUrl?imageUrl:posterImg}
                
                imageTitle={name}
                imageCaption= {`Genre: ${genre}  City: ${city} Location: ${location}  Month & Year: ${monthAndYear}`}
                onCloseRequest={() =>{ setIsOpen(false);}}
                />)
                }
            
            {/* {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                  })
                }
              />
            )} */}
        </div>
    )
}
 