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
    title: string;
    description: string;
    category: string;
    author: string;
    date?: string;
    image?: string;
};