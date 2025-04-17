import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import {X, Search} from "lucide-react"

const SearchForm = ({query}:{query?:string}) => {

  return (
    <Form action='/' scroll={false} className='search-form'>
      <input
        name="query"
        defaultValue=""
        className="search-input"
        placeholder="Search Input"
      />
      <div className='flex gap-2.5'>
        {query && <SearchFormReset/>}
        <button >
          {/* <X className="size-5" /> */}
          <Search className='size-7'/>
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
