import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/home.style.css'

const Photos = ({public_photos,profile_data}) => {
     
     return (
        <div className="container">
            <div className="flexbin flexbin-margin ">
            { public_photos !== null ? (
               <>
                {
                public_photos.map((data,i)=>(
                    
                    <Link to={`/photo/${data.id}`} className="flexbin flexbin-margin">
                    <div class="image-item" key={i} style={{"display": "block"}}>
                    
                        <img class="img" src={data.photo} />  

                        <div  className="image-item-info">
                            <Link to={`/${profile_data.username}`}>
                            <div className="user_info  m-2 p-2">
                                <img class="img-fluid rounded-circle" width="30px" height="30px" src={profile_data.profile.profile_pic} alt="" />
                                <span className="h3 text-bold m-2 ">{profile_data?.username}</span>
                            </div>
                            </Link>
                   
                 
                                 
                                
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
