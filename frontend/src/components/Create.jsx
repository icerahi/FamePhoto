import React,{useState,useEffect} from 'react'
import { useStateValue } from '../state/StateProvider'
import CreateModal from './CreateModal'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Create = () => {
    const [showModal, setshowModal] = useState(false)
    const[{user},dispatch] = useStateValue()

  
   

     

 

 

    return (
         <div>
             {user &&  <button className="addNew" onClick={()=> setshowModal(true)} > <i className="fa fa-plus"></i> </button>}
             
             {!user && <Link to='/login'>  <button className="addNew" onClick={()=> dispatch({type:'message',value:'You have to login to create a new !'})} > <i className="fa fa-plus"></i> </button> </Link> }
           

            <div onClick={event => event.target.className === 'create' ?setshowModal(false):null } className="show_create_modal">
                
            { showModal?<CreateModal/>:null}
            </div>
         </div>
        
    )
}

export default Create
