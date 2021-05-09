import React, { useState ,useEffect} from 'react'
import Albums from './Albums'
import Photos from './Photos'
import './profile.css'

import { useParams } from 'react-router'
import axios from 'axios'
import { domain, profile_url } from '../../env'

const Profile = () => {

    const {username} = useParams()

    const [profileData, setprofileData] = useState(null)
    
    const [publicPhotos, setpublicPhotos] = useState(null)
    const [publicAlbum, setPublicAlbum] = useState(null)

    useEffect(() =>{
        const getProfile = async()=>{
            await axios.get(`${profile_url}/${username}/`) 
            .then(response => {
                setprofileData(response.data)
                axios.get(response.data?.photos?.public).then(response => setpublicPhotos(response.data))
                })
           
            .catch((err) => console.log('something wrong'))
        }
        getProfile();
    },[])
    console.log(publicPhotos)
    return (
        
        <main>
    <div classNameName="container">
        <div className="container">
    
            <div className="profile">
    
                <div className="profile-image">
    
                    <img className='img-fluid' height="50%" width="50%" src={profileData?.profile?.profile_pic} alt=""/>
    
                </div>
    
                <div className="profile-user-settings">
    
                    <h1 className="profile-user-name">{profileData?.username}</h1>
    
                    <button className="p_btn profile-edit-btn">Edit Profile</button>
    
                    <button className="p_btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
    
                </div>
    
                <div className="profile-stats">
    
                    <ul>
                        <li><span className="profile-stat-count">{profileData?.total_photo}</span> photos</li>
                        <li><span className="profile-stat-count">{profileData?.total_album}</span> Albums</li>
                     </ul>
    
                </div>
    
                <div className="profile-bio w-50 vh-10">
    
                    <p><span className="profile-real-name d-block">{profileData?.profile?.fullname}</span> {profileData?.profile?.bio}</p>
                    <p><span className="profile-real-name d-block">{profileData?.profile?.location}</span> <span className="d-block"> {profileData?.profile?.birth_date?`Date of Birth : ${profileData?.profile?.birth_date}`:""}</span></p>

                </div>
      
    
            </div>
          
    </div>
        <hr />
        <div className="tab container ">
            
        <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
        <li class="nav-item" role="presentation">
            <a
            class="nav-link active"
            id="ex1-tab-1"
            data-mdb-toggle="tab"
            href="#ex1-tabs-1"
            role="tab"
            aria-controls="ex1-tabs-1"
            aria-selected="true"
            >Photos</a
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
            >Albums</a
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
            
            <Photos public_photos={publicPhotos} profile_data={profileData}/>
        </div>
        <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
            <Albums/>
        </div>
    
    </div>

            </div>
        
     
        </div>
    </main>
  
    )
}

export default Profile
