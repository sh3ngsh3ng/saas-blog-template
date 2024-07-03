'use server';
import { PostFormSchemaType } from '@/app/dashboard/schema';
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '../types/supabase';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '../supabase';


// const cookieStore = cookies()

const DASHBOARD = "/dashboard"

// const supabase = createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//         cookies: {
//             get(name: string) {
//                 return cookieStore.get(name)?.value
//             },
//         },
//     }
// )



export async function createPost(data: PostFormSchemaType) {
    const supabase = await createSupabaseServerClient()
    const { ["content"]: excludedKey, ...post } = data

    const savedPost = await supabase.from("post").insert(post).select("id").single()

    if (savedPost.error) {
        return JSON.stringify(savedPost)
    } else {
        const savedPostContent = await supabase.from("post_content").insert({ id: savedPost.data.id!, content: data.content })
        revalidatePath(DASHBOARD)
        return JSON.stringify(savedPostContent)
    }

}

export async function readAllPost() {
    const supabase = await createSupabaseServerClient()
    return supabase.from("post").select("*").order("created_at", { ascending: true });
}

export async function readAllPublishedPost() {
    const supabase = await createSupabaseServerClient()
    return supabase.from("post").select("*").eq("is_published", true).order("created_at", { ascending: true });
}


export async function deletePostById(postId: string) {
    const supabase = await createSupabaseServerClient()
    const result = await supabase.from("post").delete().eq("id", postId)
    revalidatePath(DASHBOARD)
    revalidatePath("/post/" + postId)
    return JSON.stringify(result)
}

// updating from blog table
export async function updatePostById(postId: string, data: PostFormSchemaType) {
    const supabase = await createSupabaseServerClient()
    const result = await supabase.from("post").update(data).eq("id", postId)
    console.log("called: ", result)
    revalidatePath(DASHBOARD)
    return JSON.stringify(result)
}

export async function updatePostDetailById(postId: string, data: PostFormSchemaType) {
    const { ["content"]: excludedKey, ...post } = data
    const supabase = await createSupabaseServerClient()

    const result = await supabase.from("post").update(post).eq("id", postId)

    if (result.error) {
        return JSON.stringify(result)
    } else {
        const result = await supabase.from("post_content").update({ content: data.content }).eq("id", postId)
        revalidatePath(DASHBOARD)
        // revalidatePath("/blo/" + postId)
        return JSON.stringify(result)
    }
}

export async function readPostById(postId: string) {
    const supabase = await createSupabaseServerClient()
    return await supabase.from("post").select("*, post_content(*)").eq("id", postId).single()
}




