import React from 'react'
import Main from './Main'
import { TBlog } from '@/types/dataBlogType'
import { getBlogs } from '@/lib/mutations/getAllBlogs'

export const Home = async () => {
    const data: TBlog[] = await getBlogs()

    return (
        <>
            <Main blogs={data}/>
            
        </>
    )
}

