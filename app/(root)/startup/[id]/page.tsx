import React from 'react'


const page = async({params} : {params: Promise<{id: string}>}) => {
    // why must have this paranthesis
    const id = (await params).id
  return (
    <>
    <h1>
        THis is a startup number: {id}
    </h1>
    </>
  )
}

export default page
