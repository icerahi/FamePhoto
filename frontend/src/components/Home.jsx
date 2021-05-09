import React, { useEffect, useState } from 'react'
import '../styles/home.style.css'
import axios from 'axios'
import { domain } from '../env'
import {Link} from 'react-router-dom'
 


const Home = () => {
    const [Data, setData] = useState(null)
    useEffect(()=>{
        const getData = async()=>{
            await axios.get(`${domain}/photos/`).then(res => setData(res.data))
        }
        getData();

    },[]) 
    const [showDetails, setshowDetails] = useState(false)
    
    return (
        <div className="container">
            <div className="flexbin flexbin-margin ">
            { Data !== null ? (
               <>
                {
                Data.map((data,i)=>(
                
                <Link to={`/photo/${data.id}`} className="flexbin flexbin-margin">
                    <div class="image-item" key={i} style={{"display": "block"}}>
                    
                        <img class="img" src={data.photo} />  

                        <div  className="image-item-info">
                           
                            <div className="user_info  m-2">
                            <Link to={`/${data.user.username}`}>
                                <img class="img-fluid rounded-circle" width="30px" height="30px" src={data.user.profile_pic} alt="" />
                                <span className="h3 text-white m-2 ">{data.user.username}</span>
                                </Link>
                            </div>
                        
                   
                 
                                 
                                
                            </div> 
                    </div>
                    </Link>
                     
              ))
               }
          </> ):(     <div classNameName="loader"></div>)}
                
            </div>
        </div>

    )
}

export default Home
