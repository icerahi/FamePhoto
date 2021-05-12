import React, {useState,useEffect} from 'react';
import { useStateValue } from '../state/StateProvider';
import '../styles/modal.style.css'
import axios from 'axios'
import {useHistory,useParams} from 'react-router-dom'
import Select from 'react-select'
import { domain } from '../env';


const UpdateContent = () => {
    const[caption,setCaption]=useState(null)
    const[album,setAlbum]=useState(null)
    const[albumlabel,setAlbumlabel]=useState("Select Album")
    const[photo,setPhoto]=useState(null)

    const[{user,albums},dispatch]=useStateValue()
    
    const [error, seterror] = useState(null)

    console.log('albums -'+ albums)
    const useralbums = albums?.map(item=>(
        item.keep_private === false?{ label:item.name,value:item.id,className:"fa fa-lock text-dark"}:
        { label: <span> <i className="fa fa-lock"></i>  {item.name} </span> ,value:item.id,className:"text-dark"}
       
         
     ))

     console.log(useralbums)

     let {id}=useParams()
     const [data, setdata] = useState(null)

     const [image, setImage] = useState(null);
     
  
     useEffect(() =>{
         const getData = async()=>{
             
             await axios.get(`${domain}/api/photos/${id}/`).then(res =>{
                setdata(res.data)
                setImage(res.data.photo)
                setCaption(res.data.caption)
                setAlbum(res.data.album.name)
                
            })
             .catch(err => id+=1 )
         }
 
         getData()
     },[id])
      
    
 
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


    const Update=async()=>{
       
            let form = new FormData()
            form.append('caption',caption)
            form.append('album',parseInt(album))
            form.append('photo',photo)
    
            await axios({
                method:'PUT',
                url:`${domain}/photos/${id}/`,
                data:form,
                headers:{
                    Authorization:`JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res =>{
                history.goBack()
            })
            .catch(err => console.log(err?.response?.data))
     
  
      
    }


   
    const handleSelect=(album)=>{
        console.log(album?.value)
        setAlbum(album?.value)
        setAlbumlabel(album?.label)
        
    }
   console.log(data)

    return (
        <div className="create" onClick={(e)=> e.target.className === 'create' && history.goBack()}>
            <div className="create_form row">
                 <div className="col-md-6" id="left_side">
        
                    <div className="section2">
                 
                            <input value={image} onChange={previewImage} type="file" name="upload_img" id="upload_img" value="" required/>
                            
                      

                        <div className="img_preview_container"
                            style={{
                                display: 'block' 
                            }}>
                            <div className="preview_img">
                                
                                <img className="img-fluid img-responsive"  src={image} alt="pin_image" />
 
                            </div>
                        </div>
                    </div>
 
                </div>

                <div class="col-md-6 justify-content-center px-3 mb-3">

                 {/* {<p className="bg-danger text-center rounded-pill display-7 text-dark">error?.non_field_errors</p>}  */}

                <div class="form-group  "> 
                   
                    <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Add your caption" type="text" className="new_pin_input" id="pin_title" />
           
                <div class="form-group m-2"> 
                 
                <Select
                            name="album"
                            className="form-control my-5"
                            value={album}
                            isClearable
                            onChange={handleSelect}
                            options={useralbums}
                            isSearchable="true"
                            placeholder={albumlabel}
                              required/> <small>current album <strong className="text-dark h5">{album}</strong></small></div>
                
                
                
                          
                <div class="form-group p- mt-5">  
                        <button  onClick={Update} className="btn btn-lg py-4 btn-success form-control">Update</button> 
                    </div>
              

                    {error &&<p className="bg-danger mt-5 text-center display-7 text-dark">{error}</p>} 

            </div>
         
                 
              
                    

                </div>
            </div>
        </div>
    )
}

export default UpdateContent
