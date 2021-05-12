import React, { useState,useEffect } from 'react'
import { BrowserRouter,Route,Switch ,withRouter} from 'react-router-dom'
import jwtDecode, { InvalidTokenError } from 'jwt-decode'
import {toast,ToastContainer} from 'react-toastify'
import Header from './components/Header'
import Home from './components/Home'
import './App.css'
import Create from './components/Create'
import reactDom from 'react-dom'
import Profile from './components/profile/Profile'
import PhotoDetail from './components/PhotoDetail'
import AlbumDetail from './components/AlbumDetail'
import Album from './components/Album'
import Users from './components/Users'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { useStateValue } from './state/StateProvider'
import 'react-toastify/dist/ReactToastify.css'; 
import EditProfile from './components/profile/EditProfile'
import axios from 'axios'
import UpdateContent from './components/UpdateContent'
import CreateAlbum from './components/CreateAlbum'
import EditAlbumInfo from './components/EditAlbumInfo'

toast.configure()

const App = () => {
  const [{user,reload,message},dispatch]=useStateValue()
  
  useEffect(() =>{
    try{
      const token = localStorage.getItem('token')
      const user = jwtDecode(token)
      dispatch({type:'user',value:user})

    }
    catch(err){
      dispatch({type:'user',value:null})
    } 
     

    },[message])
 
  return (
     <BrowserRouter>
      
      <Header/>
      
      <Create/>
    
    {!user &&
        <Switch>
          <Route exact path="/login" component={Login}/>
         <Route exact path="/register" component={Register}/>
         <Route exact path='/' component={Home}/>
         <Route exact path='/album' component={Album}/>
         <Route exact path='/users' component={Users}/>
         <Route exact path='/album/:id' component={AlbumDetail}/>
         <Route exact path='/photo/:id' component={PhotoDetail}/>
         <Route exact path='/:username' component={withRouter(Profile)}/>

       </Switch>
     }
     {user && 
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/album' component={Album}/>
        <Route exact path='/album/create' component={CreateAlbum}/>
        <Route exact path='/users' component={Users}/>
        <Route exact path='/album/:id' component={AlbumDetail}/>
        <Route exact path='/photo/:id' component={PhotoDetail}/>
        <Route exact path='/photo/:id/edit' component={UpdateContent}/>
        <Route exact path='/album/:id/edit' component={EditAlbumInfo}/>
        <Route exact path='/:username' component={Profile}/>
        <Route exact path='/:username/edit' component={EditProfile}/>
      
    </Switch>
     }
 
 
       

    </BrowserRouter>
     
  )
}

export default App
