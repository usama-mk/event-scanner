import React from 'react';
import Poster from '../../Components/Poster/Poster';
import './Home.css'

export default function Home() {
    return (
        <div className="home">
            <div className="title">
              <h1>
              EventsScanner! Searching for an event made simple!
              </h1>
              <div className="dropDowns">
  
                <select style={{padding:"5px", margin:"10px"}} name="genre" id="genre">
                <option value="" disabled selected>Genre</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Romance">Romance</option>
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
            <div className="container">
                <Poster/>
            </div>
            
        </div>
    )
}
