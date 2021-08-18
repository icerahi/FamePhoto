import React,{useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../../styles/home.style.css'
import axios from 'axios'
import { useStateValue } from '../../state/StateProvider';


const Photos = ({photos}) => {
    const {username}=useParams()
   
   

     

     return (
        <div className="container">
            <div className="flexbin flexbin-margin ">
            { photos !== null ? (
               <>
                {
                photos?.map((data,i)=>(
                    
                    <Link to={`/photo/${data.id}`} className="flexbin flexbin-margin">
                    <div class="image-item" key={i} style={{"display": "block"}}>
                    
                        <img class="img" src={data.photo} />  

                        <div  className="image-item-info">

                          {/* <div className="user_info  m-2">
                            <Link to={`/${username}`}>
                                <img class="img-fluid rounded-circle" width="30px" height="30px" src={profile_data?.profile?.profile_pic} alt={profile_data?.username} />
                                <span className="h3 text-white m-2 ">{profile_data?.username}</span>
                                </Link>
                            </div> */}
                   
                 
                                 
                                
                            </div> 
                    </div>
                    </Link>
               
                     
              ))
               }
          </> ):( <h1>No posts yet!</h1> )}
                
            </div>
        </div>


    )
}

export default Photos
