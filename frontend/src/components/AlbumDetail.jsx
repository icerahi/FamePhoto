import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Link } from 'react-router-dom'
const AlbumDetail = () => {
    const {id}=useParams()
    const [Data, setData] = useState(null)
    useEffect(()=>{
        const get_data=async () =>{
            await axios.get('http://localhost:8000/api/albums/'+id+'/').then(res => setData(res.data))
        }
        get_data();
    },[] )

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
                           <Link to={`/album/${Data?.id}`}> Album_ <p class="text-dark h2 display-5" title="Album Name">{Data?.name}</p></Link>
                        </figcaption>
                        </figure>

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
