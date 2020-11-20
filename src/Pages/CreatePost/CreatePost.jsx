import { IconButton, Input, LinearProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { db, firebaseApp, storage } from '../../firebase';
import { toast } from 'react-toastify';
// import '../Components/toast.css';
import 'react-toastify/dist/ReactToastify.css';
import './CreatePost.scss'



toast.configure();
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        backgroundColor: "#3f51b5",
        // color: 'white',
        margin: theme.spacing(3, 0, 2), 
        
        '&:hover': {
            backgroundColor: "blue",
            color: 'white',
            fontWeight: "bold"
        }
    },
}));



export default function CreatePost(props) {
    const classes= useStyles();
    const {register,handleSubmit, errors, reset} = useForm();
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [country , setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [eventType, setEventType] = useState("");
    const [linkToEvent, setLinkToEvent] = useState("");
    const [uploader, setUploader] = useState("");
    
    
    const onSubmit = data => {
        data.userEmail= props.user.email;
        console.log(data.userEmail)
        const refID = db.collection("posters").doc().id;
        const ref = db.collection('posters').doc(refID);  
        var URL;
        if(file && progress==100){
            storage.ref("images").child(file.name).getDownloadURL().then(url => {
                URL=url;      

             }).then(()=>{
                 ref.set({
                     userEmail: data.userEmail,
                     imageUrl: URL,
                     name: data.name,
                     country: data.country,
                     city: data.city,
                     location: data.location,
                     monthAndYear: data.monthAndYear,
                     eventType: data.eventType,
                     description: data.description,
                     linkToEvent: data.linkToEvent,
                     uploader: data.uploader
                 })
             }).then(()=>{
                 ref.update({
                     imageUrl: URL
                 })
                 // clearEditProfile();
             })

             toast.success('🚀 Successfully added the data to the database ', {
                position: "bottom-center",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                reset();
                setFile("");
        }
      else{
        toast.warning("please upload an image or let it finish uploading");
      }
       
       
    };
   
    const selectFileHandler = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    
    }
   
    const uploadFileHandler = () => {
        if (file) {
            const uploadTask = storage.ref(`images/${file.name}`).put(file);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                    console.log(progress)
                },
                error => {
                    console.log(error);
                },
               
            )
        }
    }

    return (
        <div  className={classes.paper}>
            <h1>Create Poster</h1>
            <h2>Upload Poster Picture</h2>
              <div>
              <input type="file" className="input"  onChange={selectFileHandler}/> <br/>
               <LinearProgress color="primary" variant="determinate" value={progress} />
               <button className="btn"  onClick={uploadFileHandler} >Upload</button>
              </div>
           <form autoComplete="off" className="go-right" onSubmit={handleSubmit(onSubmit)} >
        
  {/*  */}
  <div>
           <input style={{marginTop:"10px"}} placeholder="Name"  type="text"  name="name"  ref={register({required: true})}/>
    <label >Name</label>
  </div>
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="Country" name="country" type="text" ref={register({required: true})}/>
    <label>Country</label>
  </div>
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="City" name="city" type="text" ref={register({required: true})}/>
    <label>City</label>
  </div>
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="Location" name="location" type="text" ref={register({required: true})}/>
    <label>Location</label>
  </div>
  {/*  */}
  <div>
    <input className="selectDate" style={{marginTop:"10px"}}  name="monthAndYear" type="month" ref={register({required: true})}/>
    <label>Month & Year</label>
  </div>
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="Event Type" name="eventType" type="text" ref={register({required: true})}/>
    <label>Event Type</label>
  </div>
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="Description" name="description" type="text" ref={register({required: true})}/>
    <label>Description</label>
  </div>
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="Link To Event" name="linkToEvent" type="text" ref={register({required: true})}/>
    <label>Link To Event</label>
  </div>
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="Uploader" name="uploader" type="text" ref={register({required: true})}/>
    <label>Uploader</label>
  </div>
  {/*  */}
   
  
           {/* {errors.password && <p>{errors.password.message}</p>} */}
           <IconButton>
           <input style={{backgroundColor:"#f06d06"}} className={classes.submit} type="submit" value="Add Poster" />

           </IconButton>           </form>
        </div>
    )
}
 