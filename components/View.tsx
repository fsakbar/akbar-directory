import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'
// Custom logging function
// import { log } from '@/app/utils'

const View = async ({id} : {id: string}) => {
  const {views: totalViews} = await client
    .withConfig({useCdn:false})
    .fetch(STARTUP_VIEWS_QUERY,{id})

    //this is update ppr and really have impact
  after(async () => {await writeClient
    .patch(id)
    .set({views: totalViews + 1}).commit()}
  )

    return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping/>
        </div>
        <p className='view-text'>
            <span className='font-black'>Views: {totalViews}</span>
        </p>
    </div>
  )
}

export default View
