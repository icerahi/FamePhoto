import React from 'react'
import {Link} from 'react-router-dom';
 

const Header = () => {
    return (
    <nav className="navbar navbar-light bg-white sticky-top mt-0 border-bottom border-2 shadow-1-strong">
        <div className="container">

        <Link to="/"><img className="navbar-brand" height = "35" src="/images/fame.png"/></Link>

      <div className="float-right ">
        <Link title="Home" className="nav-item m-3" to="/"><img src='/images/home.png' height="25" width="25"/></Link>
        <Link title="Albums" className="nav-item  m-3" to="/album"><img src='/images/album.png' height="25" width="25"/></Link>
        <Link title="Peoples" className="nav-item  m-3 " to="/"><img src='/images/peoples.png' height="25" width="25"/></Link>
        <Link title="Profile" className="nav-item  m-3 " to="/profile"><img src='/images/user.png' height="25" width="25"/></Link>
      </div>
        
        </div>
      </nav>
      
 

    )
}

export default Header
 