import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon, Fullscreen } from 'lucide-react'
import Link from "next/link";
import Image from 'next/image';
import { auth } from '@/auth';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
// export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export type StartupTypeCard = Omit<Startup, "auth"> & {auhtor?: Author};

const StartupCard = ({post}: {post: StartupTypeCard}) => {
  const {_createdAt, views, author, title, category, _id, image, description} = post
  return (
    <li className="startup-card group">
        <div className="flex-between">
            <p className='startup_card_date'>
                {formatDate(_createdAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary'/>
                <span className='text-16-medium'>{views}</span>
            </div>
        </div>
        <div className='flex-between mt-5 gap-5'>
          <div className='flex-1'>
            <Link href={`/user/${author?._id}`}>
              <p className='text-16-medium line-clamp-1'>{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
              <p className='text-26-semibold'>{title}</p>
            </Link>
          </div>
          <div>
            <Link href={`/user/${author?._id}`}>
              <Image src="https://placehold.co/48x48" alt="placeholder" 
              width={48} height={48} className='rounded-full'
              />
            </Link>
          </div>
        </div>
        <div className='mt-3 startup-card-desc'>
          <Link href={`/startup/${_id}`}>
            <p>{description}</p>
            <Image src={image} alt='placeholder' className='startup-card_img' width={1000} height={200}/>
            {/* <img src={image} alt="placeholder" className='startup-card_img'/> */}
          </Link>
        </div>
        <div className='flex-between gap-3 mt-5'>
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className='text-16-medium'>{category}</p> 
          </Link>
          <Button className="startup-card_btn" asChild>
            <Link href={`/startup/${_id}`}>
              Details
            </Link>
          </Button>
        </div>


    </li>
  )
}

export default StartupCard
