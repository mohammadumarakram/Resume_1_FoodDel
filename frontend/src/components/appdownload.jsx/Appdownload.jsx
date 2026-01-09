import React from 'react'
import "./appd.css"
import { assets } from '../../assets/assets'
const Appdownload = () => {
  return (
    <div className='app-download' id='app-download'>

        <p>For better Experience Dowload <br /> Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>

      
    </div>
  )
}

export default Appdownload
