import React, {useState,useEffect} from 'react';
import { useStateValue } from '../state/StateProvider';
import '../styles/modal.style.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Select from 'react-select'
import { domain } from '../env';
import { toast } from 'react-toastify';

function CreateModal({show}) {
    const[caption,setCaption]=useState("")
    const[album,setAlbum]=useState("")
    const[albumlabel,setAlbumlabel]=useState("Select Album")
    const[photo,setPhoto]=useState("")

    const[{user,albums},dispatch]=useStateValue()
    
    const [error, seterror] = useState(null)

    
    const useralbums = albums?.map(item=>(
        item.keep_private === false?{ label:item.name,value:item.id,className:"fa fa-lock text-dark"}:
        { label: <span> <i className="fa fa-lock"></i>  {item.name} </span> ,value:item.id,className:"text-dark"}
       
         
     ))
    
    const [image, setImage] = useState(null);
    const [showModalPin, setShowModalPin] = useState(false);
    const [showLabel, setshowLabel] = useState(true)
    const history = useHistory()
    const previewImage=(e)=>{
        setPhoto(e.target.files[0])
        if(e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]))
            setshowLabel(false)
            setShowModalPin(true)

        }

    }


    const Post=async()=>{
        if (photo && album){
            let form = new FormData()
            form.append('caption',caption)
            form.append('album',parseInt(album))
            form.append('photo',photo)
    
            await axios({
                method:'POST',
                url:`${domain}/api/photos/`,
                data:form,
                headers:{
                    Authorization:`JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res =>{
                dispatch({type:'message',value:"Created successfully!!"})
                history.push('/')
                show(false)

            })
            .catch(err => console.log(err?.response?.data))
        }
        else{
            seterror("Photo and album selection is mendatory!")
        }
      
    }
   
    const handleSelect=(album)=>{
        console.log(album?.value)
        setAlbum(album?.value)
        setAlbumlabel(album?.label)
        
    }
   
    const EnterPressSubmit =(event) =>{
        if(event.key === "Enter"){
            Post()
        }
    }
    return (
        <div className="create">
            <div className="create_form row">
            <h2 class="inline-block text-center"> Create New </h2>  

                 <div className="col-md-6" id="left_side">
        
                 <div className="section2">
                 
                 <input onChange={previewImage} type="file" name="upload_img" id="upload_img" value="" required/>
                 
           

             <div className="img_preview_container"
                 style={{
                     display: 'block' 
                 }}>
                 <div className="preview_img">
                 {image && <img className="img-fluid img-responsive"  src={image} alt="pin_image" />}

  
                 </div>
             </div>
         </div>
 
                </div>

                <div class="col-md-6 justify-content-center px-3 mb-3">

                 {/* {<p className="bg-danger text-center rounded-pill display-7 text-dark">error?.non_field_errors</p>}  */}

       
                <div class="border-0 border"> 
                <Select
                            name="album"
                            className=" my-5"
                            value={album}
                            isClearable
                            onChange={handleSelect}
                            options={useralbums}
                            isSearchable="true"
                            placeholder={albumlabel}
                              required/>
                               </div>
                
                               <div class="form-group  "> 
                   
                   <input onKeyPress={EnterPressSubmit} onChange={e => setCaption(e.target.value)} placeholder="Add your caption" type="text" className="new_pin_input" id="pin_title" />
          
                
                          
                <div class="form-group p- mt-5">  
                        <button  onClick={Post} className="btn btn-lg py-4 btn-success form-control">Save</button> 
                    </div>
              

                    {error &&<p className="bg-danger mt-5 text-center display-7 text-dark">{error}</p>} 

            </div>
         
                 
              
                    

                </div>
            </div>
        </div>
    )
}

export default CreateModal;
