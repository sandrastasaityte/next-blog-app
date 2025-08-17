import { assets, blog_data } from '../app/Assets/assets';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[380px] sm:max-w-[230px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
      <Link href={`/blogs/${id}`}>
        <a>
          <Image
            src={image}
            alt={title}
            width={380}
            height={350}
            className="border-b border-black"
          />
        </a>
      </Link>
      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">{category}</p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700"
        dangerouslySetInnerHTML={{__html:description.slice(0,120)}}></p>
        
        <Link href={`/blogs/${id}`} className="inline-flex items-center py-2 font-semibold text-center">
          Read more <Image src="/images/arrow.png" className="ml-2" alt="arrow icon" width={12} height={12} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
