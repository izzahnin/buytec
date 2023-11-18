import React from 'react'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <main className='w-screen flex flex-col justify-center items-center'>
      <section className='w-full'>
        <Image className='w-full' src="/images/home__about-background.png" alt='aboutBackground' width={500} height={500}/>
      </section>

      <section className=' flex flex-col absolute text-center text-[18px] gap-[25px] text-white lg:text-[44px] lg:gap-[88px] md:text-[28px] md:gap-12 sm:text-[22px] sm:gap-10'>
        <h1 className='font-medium'>About Us</h1>
        <button className='font-medium border-white border-2 rounded-md'>More</button>
      </section>
    </main>
  )
}
