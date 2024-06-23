'use client'
import React, { useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user'

export default function SessionProvider() {
    const setUser = useUser((state) => state.setUser)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const readUserSession = async () => {
        const { data } = await supabase.auth.getUser()
        setUser(data?.user)
    }

    useEffect(() => {
        readUserSession()
    }, [])

    return <></>
}
