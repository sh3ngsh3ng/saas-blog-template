import React, { ReactNode } from 'react'
import NavLinks from './components/NavLinks'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-5">
            <NavLinks />
            {children}
        </div>
    )
}
