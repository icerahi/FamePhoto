import React,{useState,useEffect} from 'react'
import { useHistory, useParams } from 'react-router'
import { domain } from '../env'
import axios from 'axios'
import {Link} from 'react-router-dom';
import '../styles/photodetail.css'
 

const PhotoDetail = () => {
    const {id}=useParams()
    const [data, setdata] = useState(null)

    useEffect(() =>{
        const getData = async()=>{
            await axios.get(`${domain}/photos/${id}/`).then(res => setdata(res.data))
        }
        getData()
    },[])
    const history= useHistory()

    return (
<div className="screen m-0 p-0">
    <div className="close" onClick={history.goBack}>
    <img src="/images/close.png" alt="" className="img-fluid" />
    </div>
    <img src="/images/backward.png" alt="backward" className="backward img-fluid" />
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
                            <p class="display-5">
                            {data?.caption}
                            </p>
                        </blockquote>
                        <figcaption className="blockquote-footer h2 text-dark m-2">
                            Album_ <cite class="text-dark h2" title="Source Title">{data?.album?.name}</cite>
                        </figcaption>
                        </figure>
                        
                    </div>
                </div>
 
            </div>
            <img src="/images/forward.png" alt="forward" className="forward float-right img-fluid" />

        </div>
  
    )
}

export default PhotoDetail
