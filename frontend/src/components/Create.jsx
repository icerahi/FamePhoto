import React,{useState} from 'react'
import CreateModal from './CreateModal'

const Create = () => {
    const [showModal, setshowModal] = useState(false)
    return (
         <div>
            <button className="addNew" onClick={()=> setshowModal(true)} > <i className="fa fa-plus"></i> </button>

            <div onClick={event => event.target.className === 'create' ?setshowModal(false):null} className="show_create_modal">
            { showModal?<CreateModal/>:null}
            </div>
         </div>
        
    )
}

export default Create
