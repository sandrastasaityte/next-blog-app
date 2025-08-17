'use client'
import React from 'react'
import Image from 'next/image'
import { assets } from '../app/Assets/assets'

const Footer = () => {
  return (
    <div role="contentinfo" className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <Image src={assets.logo_light} alt='Logo' width={120} height={40} />
      <p className='text-sm text-white'>All rights reserved. Copyright © Sandra Stasaityte</p>
      <div className='flex gap-2'>
        <Image src={assets.facebook_icon} alt='Facebook' width={40} height={40} />
        <Image src={assets.twitter_icon} alt='Twitter' width={40} height={40} />
        <Image src={assets.googleplus_icon} alt='Google+' width={40} height={40} />
      </div>
    </div>
  )
}

export default Footer
