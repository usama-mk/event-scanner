import { Switch } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { firebaseApp } from './firebase';
import CreatePost from './Pages/CreatePost/CreatePost';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

function App() {
  const [user, setUser] = useState("");
  const authListener = ()=>{
    firebaseApp.auth().onAuthStateChanged((user)=>{
        if(user){
            
            setUser(user);
        }
        else{
            setUser("");
        }
    })
}
useEffect(()=>{
  authListener();
},[])
  return (
    <div className="App">
      <BrowserRouter>
       
       <Route exact path="/"  render={()=>(<Home user={user} />)} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/createpost" render={()=>(<CreatePost user={user} />)} />
      </BrowserRouter>
    </div>
  );
}

export default App;
