import React from 'react'
import '../../styles/albums.css'

import {Link, Switch} from 'react-router-dom';


const ProfileAlbum = ({public_albums,profile_data}) => {

    return (
        <div className="container"> 
        
            <div className="row">
                {public_albums !== null?(
                    <>
                    {
                        public_albums.map((data, i)=>(
                            <div className="col-md-3">
                                <Link to={`/album/${data.id}`}>
                            <div className="card   shadow-1-strong m-2">
                            <div className="thumbs bg-dark">
                           { data?.recent_photos?.length===0?(
                                    <>
                                    <img width="50%" className=" img-fluid" src='/images/empty.png' alt="Card image cap"/>
                                        <div className="musk text-dark"> <h1>Empty</h1></div>
                                        </>
                           ):(<>
                           {data?.recent_photos?.map((d,i)=>(
                            <>
                                <img width={`${50/(i+1)}%`} className=" img-fluid" src={d.photo} alt="Card image cap"/>
                                
                            </>
                            
                            ))}</> ) }
                           
                           
                           

                            </div>
                            <div className="info text-center">
                             <h4 class="card-title text-dark"> <i className="fa fa-unlock"></i> {data.name}</h4> 
                            <small>{data.total_photo} photo</small>
                            </div>
                            </div></Link>
                            
                            </div>
                       
                ))
                    }
                    </>
                ): <h1>No albums yet!</h1> }
            </div>
        

        {/* <div classNameName="loader"></div> */}

    </div>
    )
}

export default ProfileAlbum
