import React,{useState,useEffect} from 'react'
import { domain } from '../env'
import axios from 'axios'
import {Link,useHistory,useParams} from 'react-router-dom';
import '../styles/photodetail.css'
import { useStateValue } from '../state/StateProvider';
import { toast } from 'react-toastify';


const PhotoDetail = () => {
    let {id}=useParams()
    const [data, setdata] = useState(null)
    const [{user},dispatch]=useStateValue()

    useEffect(() =>{
        const getData = async()=>{
            if(user){

            await axios({
                    method:'GET',
                    url:`${domain}/api/photos/${id}/`,
                    headers:{
                        Authorization:`JWT ${localStorage.getItem('token')}`
                    }
                })
            .then(res => setdata(res.data))
            .catch(err => id+=1 )
            }
            else{
                await axios({
                    method:'GET',
                    url:`${domain}/api/photos/${id}/`,
           
                })
            .then(res => setdata(res.data))
            .catch(err => id+=1 )
            }
        }
 
        getData()
    },[id])
    const history= useHistory()
    
    const Delete=async()=>{           
            await axios({
                method:'DELETE',
                url:`${domain}/api/photos/${id}/`,
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
<div className="screen m-0 p-0">
    <div className="close" onClick={()=> history.push('/')}>
    <img src={require("../images/close.png").default} alt="" className="img-fluid" />
    </div>
    {console.log(data?.next_id)}
    { data?.prev_id !==null?(
                
                <Link to={`/photo/${data?.prev_id}`}>
                <img src={require("../images/backward.png").default} alt="backward" className="backward img-fluid" />
                </Link>
                ):null}
               

         <div className="photo_details m-0 p-0 ">
 
                <div className="row  m-0 p-0">
                    <div className="col-md-8 col-sm-8  d-flex align-items-center justify-content-center bg-dark">
                        
                        <img src={data?.photo} alt="" className="img-fluid " />
                       
                    </div>
                    <div className="col-md-4 col-sm-4">
                   
                        <div className="media d-flex">
                        <Link to={`/${data?.user?.username}`} >
                            <img width="15%" height="15%" className="m-3 img-fluid rounded-circle" src={data?.user?.profile_pic} alt={data?.user?.username}/>
                            <strong className="h4 text-dark  mt-4">{data?.user?.username}</strong>
                            </Link>
                      
                          

                            {data?.user?.username === user?.username && <div className="text-center ml-5 mt-3">
                             <Link to={`/photo/${data?.id}/edit`}><button className="p_btn mb-2 bg-light profile-edit-btn">Edit </button></Link>
                              <button onClick={() => {if(window.confirm('Are you sure to delete ?')){ Delete()};}} className="p_btn bg-danger profile-edit-btn">Delete</button> 


                            </div> }

                             
                         
                            
                        </div>
                       
                        <hr />
                        <figure>
                        <blockquote className="blockquote m-2 ">
                            <p title="Caption" class="display-5">
                            {data?.caption !== null?data?.caption:<></>}
                            </p>
                        </blockquote>
                        <figcaption className="blockquote-footer h2 text-dark m-2">
                           <Link to={`/album/${data?.album?.id}`}> Album_ <cite class="text-dark h2" title="Album Name">
                               {data?.album?.name}</cite>
                               {data?.album?.keep_private && <span className="bg-danger h5 m-2">(Private)</span> }</Link>
                        </figcaption>
                        </figure>
                        
                    </div>
                </div>
 
            </div>
            {data?.next_id !==null?(
                 <Link to={`/photo/${data?.next_id}`}>
                 <img src={require("../images/forward.png").default} alt="forward" className="forward float-right img-fluid" />
             </Link>
     ):null}

            {console.log(data?.prev_id)}
   

        </div>
  
    )
}

export default PhotoDetail
