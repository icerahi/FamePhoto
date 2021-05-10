import React, { useState } from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
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
import Login from './components/Login'
 

const App = () => {
  
  return (
     <BrowserRouter>
      <Header/>
      
      <Create/>
      
 
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/album' component={Album}/>
          <Route exact path='/users' component={Users}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path='/album/:id' component={AlbumDetail}/>
          <Route exact path='/photo/:id' component={PhotoDetail}/>
          <Route exact path='/:username' component={Profile}/>

        </Switch>
       

    </BrowserRouter>
     
  )
}

export default App
