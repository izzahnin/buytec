import React from 'react'
import AboutUs from './Component/AboutUs'
import OutStories from './Component/OutStories'
import Unique from './Component/Unique'

function aboutus() {
  return (
    <div>
      <AboutUs />
      <OutStories />
      <img className='w-full h-[600px] object-cover' src='/images/About_Background2.svg'></img>
      <Unique />
    </div>
  )
}

export default aboutus