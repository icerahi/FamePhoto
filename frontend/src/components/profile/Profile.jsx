import React, { useState ,useEffect} from 'react'
import ProfileAlbum from './ProfileAlbum'
import Photos from './Photos'
import './profile.css'
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { domain, profile_url } from '../../env'
import {toast} from 'react-toastify'
import { useStateValue } from '../../state/StateProvider'
import Select from 'react-select' 

const Profile = () => {
    const [{user,message,profile,albums,reload},dispatch]=useStateValue()
    const {username} = useParams()

   const [Data, setData] = useState(null)


   useEffect(()=>{
    const getData = async()=>{
        
        if(user?.username===username){
            await axios({
                method:"GET",
                url:`http://localhost:8000/api/accounts/${username}/`,
                
                headers:{
                    Authorization:`JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                setData(res.data)
                dispatch({type:'profile',value:res.data['profile']})
                // dispatch({type:'albums',value:res.data['albums']})
                // dispatch({type:'photos',value:res.data['photos']})
                if(message){
                    toast.success(message)
                }


            })
        }
        else{
            await axios({
                method:"GET",
                url:`http://localhost:8000/api/accounts/${username}/`,       
            })
            .then(res => {
                console.log(res.data)
                setData(res.data)
                // dispatch({type:'profile_data',value:res.data})
            })

        }}
       
            // toast.success(message, {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     draggable: false,
            //     progress: undefined,
            //     });
                

             
   
    getData();

    


},[message]) 




   
    return (
        
        <main>
    <div classNameName="container">
        <div className="container">
             <div className="profile">
    
                <div className="profile-image d-flex">
                    { user && <>
                <label  for="file-input">
                    <img title="Upload new " className="img-fluid change_profile" width="5%" height="5%" src="/images/change.png"/>
                </label>
                      <input style={{"display": "none"}} id="file-input" type="file" />
                    </>
                    }
             
                    <img className='img-fluid position-relative' height="50%" width="50%" src={Data?.profile?.profile_pic} alt=""/>
              

 
                </div>
    
                <div className="profile-user-settings">
    
                    <h1 className="profile-user-name">{Data?.username}</h1>
                     
                   {username === user?.username && <Link to={`/${Data?.username}/edit`}><button className="p_btn profile-edit-btn">Edit Profile</button></Link> }
                 


     
                </div>
    
                <div className="profile-stats m-0">
    
                    <ul>
                        <li><span className="profile-stat-count">{Data?.total_photo}</span> photos</li>
                        <li><span className="profile-stat-count">{Data?.total_album}</span> Albums</li>
                     </ul>
    
                </div>
    
                <div className="profile-bio w-50 vh-10">
                
                    <p><span className="profile-real-name d-block">{Data?.profile?.fullname}</span> {Data?.profile?.bio}</p>
                    <p><span className="profile-real-name d-block">{Data?.profile?.location}</span> 
                    <span className="d-block"> {Data?.profile?.birth_date?`Date of Birth : ${Data?.profile?.birth_date}`:""}</span>
                    </p>
                    <span className="profile-stat-count h4">{Data?.email}</span>

                </div>
              
      
    
            </div>
          
    </div>
        <hr />
        <div className="tab container ">
            
        <ul class="nav nav-tabs mb-3 justify-content-center" id="ex1" role="tablist">
        <li class="nav-item" role="presentation">
            <a
            class="nav-link active"
            id="ex1-tab-1"
            data-mdb-toggle="tab"
            href="#ex1-tabs-1"
            role="tab"
            aria-controls="ex1-tabs-1"
            aria-selected="true"
            >Albums</a
            >
        </li>
        <li class="nav-item" role="presentation">
            <a
            class="nav-link"
            id="ex1-tab-2"
            data-mdb-toggle="tab"
            href="#ex1-tabs-2"
            role="tab"
            aria-controls="ex1-tabs-2"
            aria-selected="false"
            >Photos</a
            >
        </li>
        
        </ul>



        <div class="tab-content" id="ex1-content">
        <div
            class="tab-pane fade show active"
            id="ex1-tabs-1"
            role="tabpanel"
            aria-labelledby="ex1-tab-1"
        >

            
            <ProfileAlbum albums={Data?.albums}/>
            {/* profile album tab end */}
        </div>
        <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
        <Photos photos={Data?.photos}/>
        </div>
    
    </div>

            </div>
        
     
        </div>
    </main>
  
    )
}

export default Profile
