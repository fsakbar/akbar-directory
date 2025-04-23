"use client"
import React, { useState } from 'react'
import {Input} from "@/components/ui/input"
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';


const StartupForm = () => {
    const [error, setError] =  useState<Record<string, string>>({})
    
    const [pitch, setPitch] = React.useState("");

    // Use when the pitch is submiting, have loading animate.
    const isPending = false;
  return (
    <form action={()=>{}} className='startup-form'>
        <div>
            <label htmlFor="title" className='startup-form_label'>Title</label>
            <Input id='title' name='title' required className='startup-form_input' placeholder='Startup Title'/>
        </div>
        {error.title && <p className='startup-form_error'>{error.title}</p>}

        <div>
            <label htmlFor="description" className='startup-form_label'>Description</label>
            <Textarea id='description' name='description' required className='startup-form_textarea' placeholder='Startup Description'/>
        </div>
        {error.description && <p className='startup-form_error'>{error.desctiption}</p>}

        <div>
            <label htmlFor="category" className='startup-form_label'>Category</label>
            <Input id='category' name='category' className='startup-form_input' required placeholder='Startup Category (Tech, Health, Education...)'/>
        </div>
        {error.category && <p className='startup-form_error'>{error.categroy}</p>}

        <div>
            <label htmlFor="link" className='startup-form_label'>Image URL</label>
            <Input id='link' name='link' className='startup-form_input' required placeholder='Link or Startup Image URL'/>
        </div>
        {error.link && <p className='startup-form_error'>{error.link}</p>}

        <div data-color-mode="light">
            <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
            <MDEditor
                value={pitch}
                onChange={(value) => {setPitch (value as string)}}
                preview='edit'
                height={300}
                style={{borderRadius: 20, overflow: "hidden"}}
                textareaProps={{
                    placeholder: "Briefly describe your Idea and awhat problem it solves"
                }}
                previewOptions={{disallowedElements: ['style'],}}
            />
            <MDEditor.Markdown source={pitch} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
        {error.pitch && <p className='startup-form_error'>{error.pitch}</p>}

        <Button type="submit" className="startup-form_btn" disabled={isPending}>
            {isPending ? "Submiting..." : "Submit Your Pitch"}
            <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default StartupForm
