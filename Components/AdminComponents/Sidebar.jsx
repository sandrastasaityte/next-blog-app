import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '../Assets/assets'; // Adjust path if needed

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100 h-screen'>
      {/* Logo Section */}
      <div className='px-2 sm:pl-14 py-3 border border-black'>
        <Image src={assets.logo} width={120} alt='Logo' />
      </div>

      {/* Sidebar Body */}
      <div className='w-28 sm:w-80 h-full relative py-12 border border-black'>
        <div className='w-[50%] sm:w-[80%] absolute right-0'>
          {/* Sidebar inner content here */}
        </div>
      </div>

      {/* Add Blog Button */}
      <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
        <Image src={assets.add.icon} alt='Add Icon' width={28} />
        <p>Add Blogs</p>
      </Link>
      
      <Link href='/admin/BlogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
        <Image src={assets.blog.icon} alt='Blog Icon' width={28} />
        <p>Blog Lists</p>
      </Link>
      
      <Link href='/admin/subscriptions' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
        <Image src={assets.email.icon} alt='Email Icon' width={28} />
        <p>Subscriptions</p>
      </Link>
    </div>
  );
};

export default Sidebar;
