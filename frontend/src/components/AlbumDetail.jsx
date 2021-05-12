import React,{useState,useEffect} from 'react'
import { useParams,useHistory } from 'react-router-dom'
import axios from 'axios'
import {Link } from 'react-router-dom'
import { useStateValue } from '../state/StateProvider'
import { domain } from '../env'
import { toast } from 'react-toastify'

const AlbumDetail = () => {
    const {id}=useParams()
    const [Data, setData] = useState(null)
    const [{user},dispatch] =useStateValue()
    useEffect(()=>{
        const getData = async()=>{
            if(user){

            await axios({
                    method:'GET',
                    url:`${domain}/api/albums/${id}/`,
                    headers:{
                        Authorization:`JWT ${localStorage.getItem('token')}`
                    }
                })
            .then(res => setData(res.data))
          
            }
            else{
                await axios({
                    method:'GET',
                    url:`${domain}/api/albums/${id}/`,
           
                })
            .then(res => setData(res.data))
         
            }
        }
 
        getData();
    },[id] )


    const history= useHistory()
    
    const Delete=async()=>{           
            await axios({
                method:'DELETE',
                url:`${domain}/album/${id}/`,
                headers:{
                    Authorization:`JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                toast.success("Delete successfully")
                history.goBack()
            })
        }
 

    return (
        <div class="container">
             
            <div className="row">
             
                <div className="col-md-9">
                     
                    <div className="flexbin flexbin-margin ">
            { Data !== null ? (
               <>
                {
                Data?.photos?.map((data,i)=>(
                
                <Link to={`/photo/${data.id}`} className="flexbin flexbin-margin">
                    <div class="image-item" key={i} style={{"display": "block"}}>
                    
                        <img class="img" src={data?.photo} />  

                        <div  className="image-item-info">
                           
                            <div className="user_info  m-2">
                            <Link to={`/${Data?.user?.username}`}>
                                <img class="img-fluid rounded-circle" width="30px" height="30px" src={Data?.user?.profile_pic} alt="" />
                                <span className="h3 text-white m-2 ">{Data?.user?.username}</span>
                                </Link>
                            </div>
                        
                   
                 
                                 
                                
                            </div> 
                    </div>
                    </Link>
                     
              ))
               }
          </> ):( <h1>No posts yet!</h1> )}
                
            </div>

 

                     </div>


                     <div style={{'position':'fixed','top':'9%','right':'2%' }} className="col-md-3 mt-5 text-center float right ">
                      <figure>
             
                        <figcaption className="blockquote-footer display-5  h2 text-dark m-2">
                           <Link to={`/album/${Data?.id}`}> Album_ <p class="text-dark h2 display-5" title="Album Name">{Data?.name}</p>
                           {Data?.keep_private && <span className="bg-danger h5 m-2">(Private)</span> } 

                            </Link>
                        </figcaption>
                        </figure>

                        {Data?.user?.username === user?.username && <div className="text-center ml-5 mt-3">
                             <Link to={`/album/${Data?.id}/edit`}><button className="p_btn mb-2 bg-light profile-edit-btn">Edit </button></Link>
                              <button onClick={() => {if(window.confirm('Are you sure to delete ?')){ Delete()};}} className="p_btn bg-danger profile-edit-btn">Delete</button> 
                            </div> }

                        <figcaption className="blockquote-footer display-5  h2 text-dark m-2">
                           {Data?.total_photo} photos
                        </figcaption>

                        <hr />

                        <Link to={`/${Data?.user?.username}`}  style={{"display": "block"}}>
                        <div className="media d-flex">
                           
                            <img width="10%" height="10%" className="m-3 img-fluid rounded-circle" src={Data?.user?.profile_pic} alt={Data?.user?.username}/>
                            <div className="media-body text-center" >
                                <strong className="h4 text-dark d-block mt-4">{Data?.user?.username}</strong>
                            </div>


              
                           
                            
                        </div>
                        </Link>

                       
                         
                     
             
                     </div>
 

            </div>
                        
        </div>
       
    )
}

export default AlbumDetail
