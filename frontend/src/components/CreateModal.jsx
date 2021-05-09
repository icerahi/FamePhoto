import React, {useState} from 'react';
import '../styles/modal.style.css'

function CreateModal() {
 
    const [image, setImage] = useState("");
    const [showModalPin, setShowModalPin] = useState(false);
    const [showLabel, setshowLabel] = useState(true)
    
    const previewImage=(e)=>{
        if(e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]))
            setshowLabel(false)
            setShowModalPin(true)

        }

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

                            <input onChange={previewImage} type="file" name="upload_img" id="upload_img" value="" />
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
                                <option value="">Select</option>
                                <option value="small">small</option>
                                <option value="medium">medium</option>
                                <option value="large">large</option>
                            </select>
                            <div onClick="" className="save_pin">Save</div>
                        </div>
                    </div>

                    <div className="section2">
                        <input placeholder="Add your title" type="text" className="new_pin_input" id="pin_title" />
                        <input placeholder="Tell everyone what your Pin is about" type="text" className="new_pin_input" id="pin_description" />
                        <input placeholder="Add a destination link" type="text" className="new_pin_input" id="pin_destination" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal;
