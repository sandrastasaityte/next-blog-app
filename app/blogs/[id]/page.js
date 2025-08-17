// app/blogs/[id]/page.jsx
import ConnectDB from '../lib/config/ConnectDB'
import BlogModel from '../lib/models/BlogModels'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../Components/Footer'
import React from 'react'

// Server Component - fetches blog by id
export default async function BlogPage({ params }) {
  await ConnectDB()

  const blog = await BlogModel.findById(params.id).lean()

  if (!blog) {
    return <p>Blog not found</p>
  }

  // Pass blog data to client component
  return <BlogContent blog={blog} />
}

// Client Component - renders blog UI, marked 'use client' for interactivity
const BlogContent = ({ blog }) => {
  return (
    <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/Assets/logo.png" // Adjust path if needed
            width={180}
            height={60}
            alt="logo"
            className="w-[130px] sm:w-auto"
          />
        </Link>
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
          Get Started
          <Image src="/images/arrow.png" alt="arrow" width={16} height={16} />
        </button>
      </div>

      {/* Title & Author */}
      <div className="text-center my-24">
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{blog.title}</h1>
        <div className="flex flex-col items-center mt-5">
          <Image
            className="mt-6 border border-white rounded-full"
            src={blog.authorImg || '/default-author.png'} // fallback image
            width={60}
            height={60}
            alt={blog.author}
          />
          <p className="mt-2 pb-2 text-lg max-w-[700px] mx-auto">{blog.author}</p>
        </div>
      </div>

      {/* Blog Body */}
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image className="border-4 border-white" src={blog.image} width={1280} height={720} alt={blog.title} />

        <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}></div>

        {/* Social share */}
        <div className="my-24">
          <p className="text-black font-semibold my-4">Share this article on social media.</p>
          <div className="flex gap-4">
            <Image src="/Assets/facebook_icon.png" width={50} height={50} alt="Facebook" />
            <Image src="/Assets/twitter_icon.png" width={50} height={50} alt="Twitter" />
            <Image src="/Assets/googleplus_icon.png" width={50} height={50} alt="Google Plus" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}