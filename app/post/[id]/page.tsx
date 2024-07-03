import { IPost } from '@/lib/types'
import Image from 'next/image'
import React from 'react'
import PostContent from '../components/PostContent'



export async function generateStaticParams() {
    const { data: post } = await fetch(
        process.env.SITE_URL + "/api/post?id=" + "*"
    ).then((res) => res.json())
    return post
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data: post } = await fetch(process.env.SITE_URL + ("/api/post?id=" + params.id)).then((res) => res.json()) as { data: IPost }

    return {
        title: post?.title,
        authors: {
            name: "Howard"
        },
        openGraph: {
            title: post?.title,
            url: process.env.SITE_URL + "/post/" + params.id,
            siteName: "Tech Blog",
            images: post?.image_url,
            type: "website"
        },
        keywords: ["Daily tech blogs"]
    }
}



export default async function page({ params }: { params: { id: string } }) {

    const { data: post } = await fetch(process.env.SITE_URL + ("/api/post?id=" + params.id)).then((res) => res.json()) as { data: IPost }

    if (!post?.id) {
        return <h1>Not Found</h1>
    }

    return (
        <div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-10">
            <div className="sm:px-10 space-y-5">
                <h1 className="text-3xl font-bold">{post?.title}</h1>
                <p className="text-sm text-gray-400">
                    {new Date(post?.created_at || "").toDateString()}
                </p>
            </div>

            <div className="w-full h-96 relative">
                <Image src={post?.image_url || "/"} alt="cover" fill className="object-cover object-center rounded-md border" sizes="(max-width: 768px): 100vw, (max-width: 1200px): 50vw, 33vw" />
            </div>

            <PostContent postId={post?.id} />
        </div>
    )
}
