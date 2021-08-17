import React from 'react'
import {NavLink} from 'react-router-dom';
import { useStateValue } from '../state/StateProvider';
import album from '../images/album.png'
const Header = () => {
    const [{user},dispatch] = useStateValue()

    const Logout = ()=>{
      localStorage.clear()
      dispatch({type:'message',value:'logouted!!'})
      window.location='/'
    }


    return (
    <nav className="navbar navbar-light bg-white sticky-top mt-0 border-bottom border-2 shadow-1-strong">
        <div className="container">

        <NavLink to="/"><img className="navbar-brand" height = "35" src={require('./../images/fame.png').default}/></NavLink>

      <div className="float-right ">
        <NavLink title="Home" activeStyle={{'color':'white'}} className="nav-item m-3" to="/"><img src={require('../images/home.png').default} height="25" width="25"/></NavLink>
        <NavLink title="Albums" activeStyle={{'color':'white'}} className="nav-item  m-3" to="/album"><img src={album} height="25" width="25"/></NavLink>
        <NavLink title="Peoples" activeStyle={{'color':'white'}} className="nav-item  m-3 " to="/users"><img src={require('../images/peoples.png').default} height="25" width="25"/></NavLink>
        {!user &&(<>
          <NavLink title="Login" activeStyle={{'color':'white'}} className="nav-item  m-3 " to="/login"><img src={require('../images/user.png').default} height="25" width="25"/></NavLink>
        </>)}
        {user &&( <>
          <NavLink title="Profile" activeStyle={{'color':'white'}} className="nav-item  m-3 " to={`/${user?.username}`}><img className="rounded-circle" src={user?.profile_pic} height="25" width="25"/></NavLink>
        </>)}
      </div>

        </div>
      {user && <img style={{"right": "2%","position": "absolute","cursor":"pointer"}} title="Logout" onClick={Logout} className="mr-5 " src={require('../images/logout.png').default} height="25" width="25"/> }

      </nav>



    )
}

export default Header
