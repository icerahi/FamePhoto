import React,{useState} from 'react'
import './login.css'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useStateValue } from '../../state/StateProvider'
 
toast.configure()
const Register = () => {
    const [error, seterror] = useState({})
    const [username, setusername] = useState(null)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [password2, setpassword2] = useState(null)
    const history = useHistory()
    const [{},dispatch]=useStateValue()

    const register =async()=>{
        await axios.post('http://localhost:8000/api/auth/register/',
        {"username":username,"email":email,"password":password,"password2":password2}
        )
        .then(res => {
            localStorage.setItem('token',res.data['token'])
            dispatch({type:'message',value:'Registration successful,Please complete your profile!!'})
            history.push(`/${res.data.username}`)})
        .catch(err => {
            seterror(err.response.data)
             
        })
    }

    const EnterPressSubmit =(event) =>{
        if(event.key === "Enter"){
            register()
        }
    }
    return (
     
             <div class="create" onClick={e => e.target.className === 'create'? history.push("/"):null}>
                <div class=" login_form row justify-content-center">
                    <div class="col-md-10 bg-white m-0 p-0">
                        <div class="row justify-content-center px-3 mb-3">
                            <h1 class="inline-block text-center"><Link to='/login' > Login  </Link> / <Link to="/register" className="m-2 p-2 shadow-1-strong border">Register</Link> </h1>  
                            <hr />
                         <h6 class="msg-info mb-1 mt-5">Please register with your info</h6>
                         {error &&<p className="bg-danger text-center rounded-pill display-7 text-dark">{error?.non_field_errors}</p>} 
 
                        <div class="form-group  ">  <input onChange={e => setusername(e.target.value)} type="text" placeholder="username"required/> </div>
                        {error &&<p className="bg-danger text-center rounded-pill display-7 text-dark">{error?.username}</p>} 
                        <div class="form-group  ">  <input onChange={e => setemail(e.target.value)} type="text" placeholder="email" required/> </div>
                        {error &&<p className="bg-danger text-center rounded-pill display-7 text-dark">{error?.email}</p>}
                        <div class="form-group"> <input onChange={e => setpassword(e.target.value)} type="password" placeholder="Password"  required/> </div>
                        <div class="form-group mt-2">   <input onChange={e => setpassword2(e.target.value)} onKeyPress={(event)=>EnterPressSubmit(event)} type="password" placeholder="Confirm Password" required/> </div>
                        
                        <div class="form-group p- mt-5">  
                                <button  onClick={register} className="btn btn-lg py-4 btn-success form-control">Register</button> 
                            </div>
                      
                    </div>
                 
                </div>
             
            </div>
</div>
    )
}

export default Register
