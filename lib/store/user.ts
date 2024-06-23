import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'

interface UserState {
    user: User | undefined | null
    setUser: (user: User | undefined | null) => void
}

export const useUser = create<UserState>()((set) => ({
    user: undefined,
    setUser: (user) => set(() => ({ user })),
}))