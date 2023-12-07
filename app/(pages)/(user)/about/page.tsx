import React from 'react'
import AboutUs from './Component/AboutUs'
import OutStories from './Component/OutStories'
import Unique from './Component/Unique'
import Image from 'next/image'

function Aboutus() {
  return (
    <div>
      <AboutUs />
      <OutStories />
      <Image width={100} height={100} alt="aboutImage" className='w-full h-[600px] object-cover' src='/images/About_Background2.svg'/>
      <Unique />
    </div>
  )
}

export default Aboutus