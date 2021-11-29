import React, { useEffect, useState } from 'react'
import '../styles/home.style.css'
import axios from 'axios'
import { domain } from '../env'
import {Link} from 'react-router-dom'
import { useStateValue } from '../state/StateProvider'
import {toast} from 'react-toastify'
import Spinner from './Spinner'


const Home = () => {
    const [{user,message},dispatch] =useStateValue()
    const [Data, setData] = useState(null)
    useEffect(()=>{
        const getData = async()=>{
            
            await axios.get(`${domain}/api/photos/`).then(res => {
                setData(res?.data)
                if(message){
                    toast.success(message, {autoClose: 2000,});
                    dispatch({type:'message',value:null})

                }
            
              

                 
            })
        }

        const get_album=  async() => {
            
            // if user authenticated load his created album
            await axios({
                method:"GET",
                url:`${domain}/api/accounts/${user?.username}/all_albums/`,
                headers:{
                Authorization:`JWT ${localStorage.getItem('token')}`
                }
        
            })
            .then(res =>{
               
                dispatch({type:'albums',value:res?.data})
            })
            .catch(err => console.log(err.response?.data))
            
    };
    getData();

    get_album()
        


    },[user]) 


 
    const [showDetails, setshowDetails] = useState(false)

    if (!Data){
        return <Spinner/>
    }
    
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
