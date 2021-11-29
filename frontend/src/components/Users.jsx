import React ,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { domain } from '../env'
import Spinner from './Spinner'
const Users = () => {
    const [data, setdata] = useState(null)
    useEffect(() =>{
        const get_data = async()=>{
            await axios.get(`${domain}/api/accounts/`).then(res => setdata(res.data))
        }
        get_data()
    },[])   

    if(!data){
        return <Spinner/>
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {data !== null?(
                    <>
                    {
                        data?.map((data,i)=>(
                            <div className="col-md-7  m-2">
                            <div className="card">
                                     <div className="card-body row" >
                                         <Link to={`/${data.username}`}>
                                         
                                    <img height="8%" width="8%" className="img-fluid rounded-circle " src={data.profile_pic} alt={data.username} />
                                   
                                        <p className="h2 d-inline m-2 text-dark">{data.username}</p>
                                        <span class="text-dark ">{data?.total_photo} photos | {data?.total_album} albums</span>
                                   
                                  
                                    </Link>
                                 </div>
                        </div>

                            </div>
                         
                        ))
                    }
                    </>
                ):( <h1>No accounts yet!</h1> )}
            </div>
        </div>
    )
}

export default Users;
