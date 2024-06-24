'use server';
import { PostFormSchemaType } from '@/app/dashboard/schema';
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '../types/supabase';


const cookieStore = cookies()
const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value
            },
        },
    }
)

export async function createPost(data: PostFormSchemaType) {
    const { ["content"]: excludedKey, ...post } = data

    const savedPost = await supabase.from("post").insert(post).select("id").single()

    if (savedPost.error) {
        return JSON.stringify(savedPost)
    } else {
        const savedPostContent = await supabase.from("post_content").insert({ id: savedPost.data.id!, content: data.content })

        return JSON.stringify(savedPostContent)
    }

}