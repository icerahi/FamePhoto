import React, { useState } from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import './App.css'
import Create from './components/Create'
import reactDom from 'react-dom'
import Profile from './components/profile/Profile'
import PhotoDetail from './components/PhotoDetail'

 

const App = () => {
  
  return (
     <BrowserRouter>
      <Header/>
      
      <Create/>
      
 
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/:username' component={Profile}/>
          <Route exact path='/photo/:id' component={PhotoDetail}/>
        </Switch>

    </BrowserRouter>
     
  )
}

export default App
