import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { useStateValue } from '../../state/StateProvider'
import axios from 'axios'
import '../../styles/profile_edit_form.css'
import { domain } from '../../env'
 

const EditProfile = () => {
    const history = useHistory()
    const [{user,profile,message},dispatch]=useStateValue()

    const [username, setusername] = useState(user?.username)
    const [email, setemail] = useState(user?.email)
    const [fullname, setfullname] = useState(profile?.fullname)
    const [bio, setbio] = useState(profile?.bio)
    const [location, setlocation] = useState(profile?.location)
    const [birth_date, setbirth_date] = useState(profile?.birth_date)

    console.log(
        profile)
    
    const closeUpdate=(event)=>{
        if(event.target.className === 'create'){
            dispatch({type:'message',value:null})
            history.goBack()
        }

    }
    const update= async() => {
        await axios({
            method:"PUT",
            url:`${domain}/api/accounts/${user.username}/`,
            data:{
                "username":username,
                "email":email,
                "profile":{
                    "fullname":fullname,
                    "bio":bio,
                    "location":location,
                    "birth_date":birth_date}
                },
                headers:{
                    Authorization:`JWT ${localStorage.getItem('token')}`
                }
            
            
        })
        .then(res => {
            console.log(res.data)
            dispatch({type:"message",value:"Profile Information updated!"})
            history.goBack()
        })
        .catch(err => console.log(err.response.data))
    }

    return (
       
        <div class="create" onClick={closeUpdate}>
        <div class="profile_edit_form row justify-content-center">
            <div class="col-md-10 bg-white m-0 p-0">
                <div class="row justify-content-center px-3 mb-3">

                 {/* {<p className="bg-danger text-center rounded-pill display-7 text-dark">error?.non_field_errors</p>}  */}

                <div class="form-group  "> 
                    <label htmlFor="username">username</label>
                    <input onChange={e => setusername(e.target.value)} value={username} type="text" id="username" placeholder="username"required/> </div>
                <div class="form-group  "> 
                    <label htmlFor="email">email</label>
                    <input onChange={e => setemail(e.target.value)} value={email} type="text" id="email" placeholder="email"required/> </div>
                
                <div class="form-group  "> 
                    <label htmlFor="fullname">fullname</label>
                    <input onChange={e => setfullname(e.target.value)} value={fullname} type="text" id="fullname" placeholder="fullname"/> </div>
                
                <div class="form-group  "> 
                    <label htmlFor="bio">bio</label>
                    <textarea onChange={e => setbio(e.target.value)} value={bio} type="text" id="bio" placeholder="bio"/> </div>

                <div class="form-group  "> 
                    <label htmlFor="location">location</label>
                    <input onChange={e => setlocation(e.target.value)} value={location} type="text" id="location" placeholder="location"/> </div>

                <div class="form-group  "> 
                    <label htmlFor="birth_date">Birth date</label>
                    <input onChange={e => setbirth_date(e.target.value)} value={birth_date} type="date" id="birth_date" placeholder="birth_date"/> </div>
                {/* {<p className="bg-danger text-center rounded-pill display-7 text-dark">error?.username</p>}  */}
                
                
                <div class="form-group p- mt-5">  
                        <button  onClick={update} className="btn btn-lg py-4 btn-success form-control">Save</button> 
                    </div>
              
            </div>
         
        </div>
     
    </div>
</div>
    )
}

export default EditProfile
