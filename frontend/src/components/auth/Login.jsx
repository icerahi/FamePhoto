import React,{useState,useEffect} from 'react'
import './login.css'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { useStateValue } from '../../state/StateProvider'
import { toast } from 'react-toastify'
import { domain } from '../../env'
 

const Login = () => {
    const [username, setusername] = useState(null)
    const [password, setpassword] = useState(null)
    const history = useHistory()
    const [error,setError]=useState(null)
    const [{message},dispatch]=useStateValue()

    const login = async ()=>{
       
        await axios.post(`${domain}/api/auth/login/`,
        {"username":username,"password":password})
        
        .then(res => {
            dispatch({type:'message',value:"login success!"})
            localStorage.setItem('token',res.data['token'])
            history.push('/')
             
            
        })
        .catch(err => {
            setError('Fail to authenticate. Your username and password is invalid!!') 
            toast.error(err.response.data['detail'])
        } )
    }
    const EnterPressSubmit =(event) =>{
        if(event.key === "Enter"){
            login()
        }
    }

    const closeLogin=(event)=>{
        if(event.target.className === 'create'){
            dispatch({type:'message',value:null})
            history.push('/')
        }

    }
    return (
     
             <div class="create" onClick={closeLogin}>
                <div class=" login_form row justify-content-center">
                    <div class="col-md-10 bg-white m-0 p-0">
                        <div class="row justify-content-center px-3 mb-3">
                            <h1 class="inline-block text-center"><Link to='/login' className="m-2 p-2 shadow-1-strong border"> Login  </Link> / <Link to="/register">Register</Link> </h1>  
                            <hr />
                      
                      <h6 class="msg-info mb-1 mt-5">Please login to your account</h6>
                      {error &&<p className="bg-danger text-center display-7 text-dark">{error}</p>} 
                      {message &&<p className="bg-danger text-center display-7 text-dark">{message}</p>} 

                            <div class="form-group m-3">  
                                <input onChange={e => setusername(e.target.value)} type="text" placeholder="email or username" required/> 
                            </div>
                            <div class="form-group"> 
                                <input onChange={e => setpassword(e.target.value)} onKeyPress={(event)=>EnterPressSubmit(event)} type="password"  placeholder="Password" required/>
                            </div>
                            <div class="form-group p- mt-5">  
                                <button  onClick={login} className="btn btn-lg py-4 btn-success form-control">Login</button> 
                            </div>
                            
                      
              
                    </div>
                 
                </div>
             
            </div>
</div>
    )
}

export default Login
