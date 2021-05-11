import React,{useState,useEffect} from 'react'
import { domain } from '../env'
import axios from 'axios'
import {Link,useHistory,useParams} from 'react-router-dom';
import '../styles/photodetail.css'
 

const PhotoDetail = () => {
    let {id}=useParams()
    const [data, setdata] = useState(null)
   
    useEffect(() =>{
        const getData = async()=>{
            await axios.get(`${domain}/photos/${id}/`).then(res => setdata(res.data))
            .catch(err => id+=1 )
        }

        getData()
    },[id])
    const history= useHistory()
    
 
    return (
<div className="screen m-0 p-0">
    <div className="close" onClick={()=> history.push('/')}>
    <img src="/images/close.png" alt="" className="img-fluid" />
    </div>
    {console.log(data?.next_id)}
    { data?.prev_id !==null?(
                
                <Link to={`/photo/${data?.prev_id}`}>
                <img src="/images/backward.png" alt="backward" className="backward img-fluid" />
                </Link>
                ):null}
               

         <div className="photo_details m-0 p-0 ">
 
                <div className="row  m-0 p-0">
                    <div className="col-md-8 col-sm-8  d-flex align-items-center justify-content-center bg-dark">
                        
                        <img src={data?.photo} alt="" className="img-fluid " />
                       
                    </div>
                    <div className="col-md-4 col-sm-4">
                    <Link to={`/${data?.user?.username}`}  style={{"display": "block"}}>
                        <div className="media d-flex">
                           
                            <img width="10%" height="10%" className="m-3 img-fluid rounded-circle" src={data?.user?.profile_pic} alt={data?.user?.username}/>
                            <div className="media-body text-center" >
                                <strong className="h4 text-dark d-block mt-4">{data?.user?.username}</strong>
                            </div>
                           
                            
                        </div>
                        </Link>
                        <hr />
                        <figure>
                        <blockquote className="blockquote m-2 ">
                            <p title="Caption" class="display-5">
                            {data?.caption}
                            </p>
                        </blockquote>
                        <figcaption className="blockquote-footer h2 text-dark m-2">
                           <Link to={`/album/${data?.album?.id}`}> Album_ <cite class="text-dark h2" title="Album Name">{data?.album?.name}</cite></Link>
                        </figcaption>
                        </figure>
                        
                    </div>
                </div>
 
            </div>
            {data?.next_id !==null?(
                 <Link to={`/photo/${data?.next_id}`}>
                 <img src="/images/forward.png" alt="forward" className="forward float-right img-fluid" />
             </Link>
     ):null}

            {console.log(data?.prev_id)}
   

        </div>
  
    )
}

export default PhotoDetail
