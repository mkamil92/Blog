import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Post from './components/Post';
import PageNotFound from './components/PageNotFound';
import { useState } from 'react';
function App() {
  let email = localStorage.getItem('email')
  const [postData, setPostData] = useState()
  
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home setPostData={setPostData}/>}/>
        <Route path="post" element={<Post postData = {postData && postData}/>}/> 
        {!email && <Route path="register" element={<Register/>}/>}
        {!email &&  <Route path="sign-in" element={<SignIn/>}/>}
        {email && <Route path="dashboard" element={<Dashboard/>}/>}
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
   </Router>
  );
}

export default App;
