'use server'
import { readPostById } from '@/lib/actions/post'
import React from 'react'
import EditForm from './components/EditForm'

export default async function page({ params }: {
    params: {
        id: string
    }
}) {


    const { data: post } = await readPostById(params.id)

    return (
        <EditForm post={post} />
    )
}
