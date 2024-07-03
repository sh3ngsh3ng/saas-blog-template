'use client'
import React, { useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user'
import { Database } from '@/lib/types/supabase'

export default function SessionProvider() {
    const setUser = useUser((state) => state.setUser)

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const readUserSession = async () => {
        // const { data } = await supabase.auth.getUser()
        const { data } = await supabase.auth.getSession()
        const { data: userInfo } = await supabase.from("users").select("*").eq("id", data.session?.user.id!).single()
        // setUser(data?.user)
        // setUser(data.session?.user)
        setUser(userInfo)
    }

    useEffect(() => {
        readUserSession()
    }, [])

    return <></>
}
