// 'use client'

import React from 'react'
import BlogTableItemList from '@/components/Dashboard/Blog/BlogTableItemList'
// import { useUser } from '@clerk/nextjs'

const BlogProvider = () => {
    // const { user } = useUser()

    return (
        <BlogTableItemList userId={(1).toString()} />
    )
}

export default BlogProvider