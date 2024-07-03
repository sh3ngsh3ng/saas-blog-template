"use client"
import MarkdownPreview from '@/components/markdown/MarkdownPreview'
import { Database } from '@/lib/types/supabase'
import { createBrowserClient } from '@supabase/ssr'
import React, { useEffect, useState } from 'react'
import PostLoading from './PostLoading'
import Checkout from '@/components/stripe/Checkout'

export default function PostContent({ postId }: { postId: string }) {

    const [postContent, setPostContent] = useState<{
        content: string;
        created_at: string;
        id: string;
    } | null>(null)

    const [isLoading, setLoading] = useState(true)

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const readPostContent = async () => {
        const { data } = await supabase.from("post_content").select("*").eq("id", postId).single()
        setPostContent(data)
        setLoading(false)
    }

    useEffect(() => {
        readPostContent()
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <PostLoading />
    }

    if (!postContent?.content) {
        return <Checkout />
    }

    return (
        <MarkdownPreview className="sm:px-10" content={postContent?.content || ""} />
    )
}
