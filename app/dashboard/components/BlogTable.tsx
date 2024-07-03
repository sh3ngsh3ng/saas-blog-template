import { Button } from '@/components/ui/button'
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Switch } from "@/components/ui/switch"
import React from 'react'
import { readAllPost, updatePostById } from '@/lib/actions/post'
import DeleteAlert from './DeleteAlert'
import SwitchForm from './SwitchForm'
import { PostFormSchemaType } from '../schema'
import Link from 'next/link'

export default async function BlogTable() {

    const { data: posts } = await readAllPost()


    return (
        <div className="overflow-x-auto">
            <div className="border bg-gradient-dark rounded-md w-[800px] md:w-full">
                <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
                    <h1 className="col-span-2">Title</h1>
                    <h1>Premium</h1>
                    <h1>Publish</h1>
                </div>
                {
                    posts?.map((post, idx) => {
                        const updatePremium = updatePostById.bind(null, post.id, { is_premium: !post.is_premium } as PostFormSchemaType)
                        const updatePublish = updatePostById.bind(null, post.id, { is_published: !post.is_published } as PostFormSchemaType)
                        return (
                            <div className="grid grid-cols-5 p-5" key={idx}>
                                <h1 className="col-span-2">{post.title}</h1>
                                {/* <Switch checked={post.is_premium} /> */}
                                <SwitchForm checked={post.is_premium} name="premium" onToggle={updatePremium} />
                                <SwitchForm checked={post.is_published} name="publish" onToggle={updatePublish} />
                                <Actions id={post.id} />
                            </div>
                        )
                    })
                }

            </div >
        </div>

    )
}

const Actions = ({ id }: { id: string }) => {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <Link href={"/post/" + id}>
                <Button variant="outline" className="flex items-center gap-2">
                    <EyeOpenIcon /> View
                </Button>
            </Link>
            <DeleteAlert postId={id} />
            <Link href={"/dashboard/blog/edit/" + id}>
                <Button variant="outline" className="flex items-center gap-2">
                    <Pencil1Icon /> Edit
                </Button>
            </Link>

        </div>
    )
}