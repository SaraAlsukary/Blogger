import { StaticImageData } from "next/image"

export type TBlogs = {
    id: number,
    title: string,
    description: string,
    image: StaticImageData,
    date: number,
    category: string,
    author: string,
    author_img: StaticImageData
}
export type TBlog = {
    id?: number;
    title?: string | null;
    description?: string | null;
    image?: string | null;
    category?: string | null;
    date?: Date | string | null;
    author?: string | null;
}