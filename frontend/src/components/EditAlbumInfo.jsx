import React ,{useState,useEffect}from 'react'
import { useParams,useHistory } from 'react-router-dom'
import axios from 'axios'
import { useStateValue } from '../state/StateProvider'

const EditAlbumInfo = () => {
    const {id} = useParams()
    
    const [name, setname] = useState("rahi")
    const [keep_private, setkeep_private] = useState(false)

    const history = useHistory()
    const [error,setError]=useState(null)
    const [{message},dispatch]=useStateValue()

   
    useEffect(() => {
        const get_data = async() => {
            await axios({
                method:'GET',
                url:`http://localhost:8000/api/albums/${id}/`,
                headers:{
                    Authorization:`JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setname(res.data.name)
                setkeep_private(res.data.keep_private)
            })
            
        };
        get_data();
    }, [name])
    console.log("name"+name)
    const update = async ()=>{
    
    
        await axios({
            method:"PUT",
            url:`http://localhost:8000/api/albums/${id}/`,
            data:{
                "name":name,
                "keep_private":keep_private
            },
            headers:{
                Authorization:`JWT ${localStorage.getItem('token')}`
            }
        })
        
        .then(res => {
            
            
          
          history.goBack()
             
            
        })
        .catch(e => console.log(e.response.data))
    }
    const EnterPressSubmit =(event) =>{
        if(event.key === "Enter"){
            update()
        }
    }
    
    const closeCreate=(event)=>{
        if(event.target.className === 'create'){
             
            history.goBack()
        }
    
    }
    return (
     
             <div class="create" onClick={closeCreate}>
                <div class=" login_form row justify-content-center">
                    <div class="col-md-10 bg-white m-0 p-0">
                        <div class="row justify-content-center px-3 mb-3">
                            <h1 class="inline-block text-center"> Update Album</h1>  
                           
                     
                      
                      {error &&<p className="bg-danger text-center display-7 text-dark">{error}</p>} 
                      {message &&<p className="bg-danger text-center display-7 text-dark">{message}</p>} 
    
                            <div class="form-group d-flex m-3">
                                <label className="h3 m-0">Keep private</label>
                               <input type="checkbox" id="check" checked={keep_private} onChange={(e)=> setkeep_private(e.target.checked)} />
                                
                            </div>
                            <div class="form-group"> 
                            <input value={name} onChange={e => setname(e.target.value)} onKeyPress={(event)=>EnterPressSubmit(event)} type="text" placeholder="album name" required/> 

                          </div>
                            <div class="form-group p- mt-5">  
                                <button  onClick={update} className="btn btn-lg py-4 btn-success form-control">Save</button> 
                            </div>
                            
                      
              
                    </div>
                 
                </div>
             
            </div>
    </div>
    )
}

export default EditAlbumInfo
