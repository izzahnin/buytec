import React from 'react'
import Image from 'next/image'

export default function CardReviewsInput() {
  return (
    <main>
        <section className='flex flex-row gap-5 shadow-lg p-5 rounded-xl lg:w-[712px]'>
            <div>
              <Image className='rounded-full w-12 sm:w-14 flex justify-center items-center' src="/images/profile.png" alt='PreviewUser' width={500} height={500}/>
            </div>

            <div>
              <input className='mt-2 text-text-l w-60 sm:w-52 md:w-72 lg:w-96' type="text" name="review" id="" placeholder='Write your review...' />
            </div>

            <div className='self-end hidden sm:block md:block sm:pl-2 sm:pt-28'>
              <button className='w-32 h-8 sm:w-[160px] sm:h-[35px] rounded-lg bg-primary-blue-accent font-black text-text-l text-white' type="submit">Submit</button>
            </div>
        </section>
    </main>
  )
}
