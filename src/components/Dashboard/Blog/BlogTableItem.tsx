'use client'
import { TBlog } from '@/types/dataBlogType'
import Image from 'next/image'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from "next/navigation";
type TProps = TBlog & {
    authorImage: string,
}
const BlogTableItem = ({ image, title, date, author, id }: TProps) => {
    const router = useRouter();

    const deleteHandler = async () => {
        await toast.promise(
            axios.delete(`/api/blogs?id=${id}`)
            .then(() => router.refresh())
            ,
            {
                pending: {
                    render: 'Uploading your blog...',
                    icon: () => (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div>
                    ),
                },
                success: {
                    render() {
                        return `'Blog Deleted Successfully!'!`;
                    },
                    icon: () => <div className="text-green-500 text-lg">🟢</div>,
                },
                error: {
                    render() {
                        return `Failed To  Deleted Blog!: Please try again`;
                    },
                    icon: () => <div className="text-red-500 text-lg">❌</div>,
                },
            },
            {
                position: "top-right",
            }
        );
    }
    return (
        <tr className='bg-white border-b '>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image src={image!} alt='' width={100} height={100} />
                <p>{author}</p>
            </th>
            <td className='px-6 py-4'>
                {title ? title : "no title"}
            </td>
            <td className='px-6 py-4'>
                {date as string}
            </td>
            <td className='px-6 py-4 '>
                <ConfirmDialog onClick={deleteHandler} title='Are You Sure You Want To Delete This Blog?' description='        This action cannot be undone. This will permanently delete this
            blog and remove your data blog from our servers.'>
                    <span className='cursor-pointer bg-red-800 w-10 p-2 text-white hover:bg-red-950 transition'>
                        X
                    </span>

                </ConfirmDialog>
            </td>
        </tr>
    )
}

export default BlogTableItem