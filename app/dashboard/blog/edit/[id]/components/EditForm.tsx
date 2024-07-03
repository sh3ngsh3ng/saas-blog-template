'use client'
import PostForm from '@/app/dashboard/components/PostForm'
import { PostFormSchemaType } from '@/app/dashboard/schema'
import { toast } from '@/components/ui/use-toast'
import { createPost, updatePostDetailById } from '@/lib/actions/post'
import { IPostDetail } from '@/lib/types'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EditForm({ post }: {
    post: IPostDetail
}) {

    const router = useRouter()

    const handleUpdate = async (data: PostFormSchemaType) => {
        const result = await updatePostDetailById(post?.id!, data)
        // const 
        const { error } = JSON.parse(result)

        if (error?.message) {
            toast({
                title: "Fail to update post",
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error.message)}</code>
                    </pre>
                ),
            })
        } else {
            toast({
                title: "Successfully update: " + data.title,
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
        <PostForm onHandleSubmit={handleUpdate} post={post} />
    )
}
