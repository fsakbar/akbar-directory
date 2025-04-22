import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from "next/link";
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
import ShowMoreText from './ShowMoreText';

export type StartupTypeCard = Omit<Startup, "auth"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, _id, image, description } = post;

  return (
    <li className="startup-card group flex flex-col justify-between h-full">
      <div>
        {/* Top: Date & Views */}
        <div className="flex justify-between">
          <p className='startup_card_date'>
            {formatDate(_createdAt)}
          </p>
          <div className='flex gap-1.5'>
            <EyeIcon className='size-6 text-primary' />
            <span className='text-16-medium'>{views}</span>
          </div>
        </div>

        {/* Author, Title, and Image */}
        <div className='flex justify-between mt-5 gap-5'>
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
                width={48} height={48} className='rounded-full' />
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className='mt-3 startup-card-desc mb-3.5'>
          <ShowMoreText text={description ?? ''} />
          <div className='mt-2'>
          <Link href={`/startup/${_id}`}>
            <Image src={image} alt='placeholder' className='startup-card_img' width={1000} height={200} />
          </Link>
          </div>
        </div>
      </div>

      {/* Bottom: Category and Details */}
      <div className="flex justify-between gap-3 mt-auto">
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
  );
};

export default StartupCard;
