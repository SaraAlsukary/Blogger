import React from 'react'
import Main from './Main'
import { getBlogs } from '@/lib/mutations/getAllBlogs'
export type TBlog = {
    id:number;
    title: string|null;
    description: string |null;
    category: string |null;
    author: string |null;
    date: string |null;
    image: string |null;
};
export const Home = async () => {
    const data: TBlog[] = await getBlogs()

    return (
        <>
            <Main blogs={data}/>
            
        </>
    )
}

