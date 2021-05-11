import React, {useState} from 'react';
import { useStateValue } from '../state/StateProvider';
import '../styles/modal.style.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
function CreateModal() {
    const[caption,setCaption]=useState(null)
    const[album,setAlbum]=useState(null)
    const[photo,setPhoto]=useState(null)

    const[{albums},dispatch]=useStateValue()
    console.log(albums)
    const [image, setImage] = useState("");
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

    const create=async()=>{
        let form = new FormData()
        form.append('caption',caption)
        form.append('album',album)
        form.append('photo',photo)

        await axios({
            method:'post',
            url:'http://http://localhost:8000/api/photos/',
            data:form,
            headers:{
                Authorization:`JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res =>{
            history.push('/')
        })
        .catch(err => console.log(err?.response?.data))
    }
   
    

    return (
        <div className="create">
            <div className="create_form">
                <div className="side" id="left_side">
        
                    <div className="section2">
                        <label htmlFor="upload_img" id="upload_img_label"
                            style={{
                                display: showLabel ? 'block' : 'none'
                            }}>
                            <div className="upload_img_container">
                                <div id="dotted_border">
                                    <div className="upload_icon_container">
                                        <img src="./images/upload.png" alt="upload_img" className="upload_icon" />
                                    </div>
                                    <div>Click to upload</div>
                                    <div className="mt-5">Recommendation: Use high-quality .jpg less than 20MB</div>
                                </div>
                            </div>

                            <input onChange={previewImage} type="file" name="upload_img" id="upload_img" value="" required/>
                        </label>

                        <div className="img_preview_container"
                            style={{
                                display: showModalPin ? 'block' : 'none'
                            }}>
                            <div className="preview_img">
                                <img className="img-fluid img-responsive"  src={image} alt="pin_image" />
                                <p className="change_img">Change</p>
                            </div>
                        </div>
                    </div>
 
                </div>

                <div className="side" id="right_side">
                    <div className="section1">
                        <div className="select_size">
                            <select defaultValue="Select" name="pin_size" id="pin_size">
                                 
                                {
                                    albums?.map((album,i)=>(
                                        <option value={album.id}>{album.name}</option>

                                    ))
                                }
                                
                            </select>
                            <div onClick={create} className="save_pin">Save</div>
                        </div>
                    </div>

                    <div className="section2">
                        <input onChange={e => setCaption(e.target.value)} placeholder="Add your caption" type="text" className="new_pin_input" id="pin_title" />
                        <input placeholder="Tell everyone what your Pin is about" type="text" className="new_pin_input" id="pin_description" />
                        <input placeholder="Add a destination link" type="text" className="new_pin_input" id="pin_destination" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal;
