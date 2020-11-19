import { Switch } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import CreatePost from './Pages/CreatePost/CreatePost';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       
       <Route exact path="/" component={Home} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/createpost" component={CreatePost} />
      </BrowserRouter>
    </div>
  );
}

export default App;
