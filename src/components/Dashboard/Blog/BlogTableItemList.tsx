import { getMyBlogs } from '@/lib/queries/getMyBlogs'
import React from 'react'
import BlogTableItem from './BlogTableItem'

const BlogTableItemList = async ({ userId }: { userId: string }) => {
    const data = await getMyBlogs(userId)
    const dataList = data.map((item, idx) =>
        <BlogTableItem key={idx}
            id={item.blogs.id}
            authorImage={item.users.image!}
            date={item.blogs.date!}
            title={item.blogs.title}
            image={item.blogs.image!}
        />)
    return (<>
        {data.length ? dataList : <tr className='h-60'><td className='text-xl text-center ' colSpan={4}>There are no blogs yet....</td></tr>}
    </>
    )
}

export default BlogTableItemList