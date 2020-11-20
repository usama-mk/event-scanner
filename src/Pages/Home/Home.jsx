import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Poster from '../../Components/Poster/Poster';
import { db, firebaseApp } from '../../firebase';
import './Home.css'

export default function Home(props) {
    const {user}= props;
    const[posters, setPosters]= useState([]);
   const [genre, setGenre]=useState(["Action", "Comedy", "Romance"])
   const[selectedGenre, setSelectedGenre]=useState("");
   const [selectedCity, setSelectedCity] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedMonthAndYear, setSelectedMonthAndYear ] = useState("");

    const handleLoginRoute=(url)=>{
        window.location.href=url ;
    }
    const handleLogout= ()=>{
        firebaseApp.auth().signOut();
        
    }
   
    const handleCreatePostRoute=()=>{
       window.location.assign("/createpost")
    }
    const handleApprovePostRoute=()=>{
        window.location.assign("/approvepost")
    }
   const selectGenre=()=>{
    const GENRE= document.getElementById("genre").value
    setSelectedGenre(GENRE);
   }
   const resetFilters=()=>{
       setSelectedGenre("")
       setSelectedLocation("")
       setSelectedMonthAndYear("")
       setSelectedCity("")
   }
    useEffect(()=>{
        
        const unsubscribe = db.collection('posters').onSnapshot((snapshot)=>
               {
                   if(!snapshot){
                       return;
                   }
              setPosters(snapshot.docs.map(doc =>                              
                  ({
                      id: doc.id,        //the unique 'auto' ids
                      data: doc.data(),  //the data inside the doc(coll>doc>data)
                  })
                  ))
               } );
            //    console.log(posters[0].data.name);
           
               return () => {      //when comp cleansup/unmount(cleansup is better), (always) detach this real time listener after it's done using it(best def)
                   unsubscribe();  //this is for optimization
               }
             
          }, []); 
     
    return (
        <div className="home">
            <div className="title">
               <div style={{marginTop:"5vh"}}>
                   {
                       user && <span style={{color:"white"}} >
                           Logged in as: {user.email} <br/>
                       </span> 
                   }
               {
                   !user && <Button onClick={()=>{handleLoginRoute("/login")}}>
                   <h4 style={{color:"yellow"}}>Login</h4>
               </Button>
               }
                {
                    user && <Button onClick={handleLogout}>
                    <h4 style={{color:"red"}}>Log Out</h4>
                </Button>
                }
                 {
                    user && <Button onClick={handleCreatePostRoute}>
                    <h4 style={{color:"yellow"}}>Create Post</h4>
                </Button>
                }
                 {
                    user && <Button onClick={handleApprovePostRoute}>
                    <h4 style={{color:"blue"}}>Approve Post</h4>
                </Button>
                }
               </div>
              <h1>
              EventsScanner! Searching for an event made simple!
              </h1>
              <div className="dropDowns">
  
                <select onChange={selectGenre} style={{padding:"5px", margin:"10px"}} name="genre" id="genre">
                <option value="" disabled selected>Genre</option>
                   {genre.map((genre)=>{
                     return  <option value={genre}>
                               {genre}
                       </option>
                   })}
                </select>

                <select style={{padding:"5px", margin:"10px"}} name="city" id="city">
                <option value="" disabled selected>City</option>
                    <option value="isb">isb</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                </select>

                <select style={{padding:"5px", margin:"10px"}} name="location" id="location">
                <option value="" disabled selected>Location</option>
                    <option value="Cent">Cent</option>
                    <option value="cine">cine</option>
                    <option value="Netflix">Netflix</option>
                </select>

                <select style={{padding:"5px", margin:"10px"}} name="month" id="month">
                <option value="" disabled selected>Month</option>
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="March">March</option>
                </select>
              </div>

              <div style={{marginTop:"10px"}} className="preDefined">
                  <span style={{marginRight:"10px", color:"white", fontWeight:"bolder"}}>Choose from predefined: </span>
                  <span style={{margin:"5px", color:"white"}}>Events in Dublin</span>
                  <span style={{margin:"5px", color:"white"}}>Only Concerts</span>
                  <span style={{margin:"5px", color:"white"}}>Concerts in 3 Area</span>
              </div>


              
            </div>
            <Button onClick={resetFilters}>Reset</Button>
            <div className="container">
               {
                   posters.map((poster)=>{
                       if(selectedGenre==poster.data.eventType){
                           console.log(`selected genre is ${selectedGenre}`)
                        return <Poster city={poster.data.city} 
                        location={poster.data.location}
                        monthAndYear={poster.data.monthAndYear}
                        genre={poster.data.eventType}
                        imageUrl= {poster.data.imageUrl}
                        name={poster.data.name}
                        />
                       }
                       else if(!selectedGenre){
                           console.log("selected genre not selected")
                        return <Poster city={poster.data.city} 
                        location={poster.data.location}
                        monthAndYear={poster.data.monthAndYear}
                        genre={poster.data.eventType}
                        imageUrl= {poster.data.imageUrl}
                        name={poster.data.name}
                        />
                       }
                      
                   })
               }
            </div>
            
        </div>
    )
}
