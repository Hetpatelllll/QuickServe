import React from 'react'
import "./AppDawnload.css"
import { assets } from '../../assets/assets'

const AppDawnload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Batter Experience Download <br /> Tomato App </p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDawnload