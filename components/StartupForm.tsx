"use client"
import React, { useActionState, useState } from 'react'
import {Input} from "@/components/ui/input"
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from "sonner"
import { createPitch } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const StartupForm = () => {
    const [errors, setErrors] =  useState<Record<string, string>>({})
    
    const [pitch, setPitch] = React.useState("");

    console.log("this is Startup Form")

    const router = useRouter()

    // Use when the pitch is submiting, have loading animate.
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues)
            console.log(formValues)

            const result = await createPitch(prevState, formData, pitch);
            console.log(result)

            if(result.status = "SUCCESS"){
              toast("Event Success",{
                description: "Your startup pitch has been created succesfully"
              })
              router.push(`/startup/${result._id}`)
            }
            



        } catch (error){
            if(error instanceof z.ZodError){
                const fieldErorrs = error.flatten().fieldErrors

                setErrors(fieldErorrs as unknown as Record<string, string>);

                toast("Event Error", {
                    description: 'Please check your inputs and try again',
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
                return {...prevState, error: 'Validation Failed', status: "ERROR"}
            }

            toast("Event Error", {
                description: 'An unexpeced error has occured',
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })

            return {
                ...prevState,
                error: 'An unexpeced error has occured',
                status: 'ERROR',
            }
        } 
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL",});



  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  )
}

export default StartupForm
