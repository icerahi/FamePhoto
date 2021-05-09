import React from 'react'
import './albums.css'
const Albums = () => {
    return (
        <div className="container"> 
   
    
        <div className="row  ">
 
            <div className="col-md-3 col-sm-3 col-lg-3 gallery-item fixed">

            
                <div className="gallery-item-info album_frame">
                    

                    <ul>
                        <li className="gallery-item-likes"> 0 Photos  </li>
                        <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 5</li>
                    </ul>

                </div>

            </div>

            
 
        </div>
     

        <div className="loader"></div>

    </div>
    )
}

export default Albums
