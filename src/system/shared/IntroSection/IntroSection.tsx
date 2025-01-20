import React from 'react'
import header_logo from '../../../assets/images/header_logo.svg';
import './style.css'
import { useCurrentPage } from '../../hooks/useCurrentPage';
function IntroSection() {
    const {title}=useCurrentPage()
  return (
    <div>
      <div className="mainBanner_header">
          <div className="mainBanner_header_container">
            <div className="mainBanner_header_icon_container">
              <img src={header_logo} alt="" className="mainBanner_header_icon_image"/>
              <p className='mainBanner_header_icon_text'>{title}</p>
            </div>
          </div>
        </div>
        <div className="mianBanner">
          <div className="mianBanner_content">
            <p className="mianBanner_content_title">Formula One</p>
            <p className="mianBanner_content_text">2025</p>
          </div>
        </div>
    </div>
  )
}

export default IntroSection
