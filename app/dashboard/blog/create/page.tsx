'use client'
import React from 'react'
import PostForm from '../../components/PostForm'
import { PostFormSchemaType } from '../../schema'
import { toast } from "@/components/ui/use-toast"
import { createPost } from '@/lib/actions/post'
import { useRouter } from 'next/navigation'

export default function page() {

    const router = useRouter()

    const handleCreate = async (data: PostFormSchemaType) => {
        const result = await createPost(data)

        const { error } = JSON.parse(result)

        if (error?.message) {
            toast({
                title: "Fail to create post",
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error.message)}</code>
                    </pre>
                ),
            })
        } else {
            toast({
                title: "Successfully created: " + data.title,
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })
            router.push("/dashboard")
        }


    }

    return (
        <PostForm onHandleSubmit={handleCreate} />
    )
}
