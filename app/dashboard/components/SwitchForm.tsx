'use client';
import { Switch } from "@/components/ui/switch"
import React from 'react'
import { toast } from "@/components/ui/use-toast"

export default function SwitchForm({
    checked, onToggle, name
}: {
    checked: boolean,
    onToggle: () => Promise<string>,
    name: string
}) {


    const onSubmit = async (e: any) => {
        e.preventDefault()
        const { error } = JSON.parse(await onToggle())
        if (error?.message) {
            toast({
                title: "Fail to update " + name,
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error.message)}</code>
                    </pre>
                ),
            })
        } else {
            toast({
                title: "Successfully udpated " + name,
            })
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <Switch checked={checked} type="submit" />
        </form>
    )
}
