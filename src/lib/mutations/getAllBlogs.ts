import { db } from "@/db";
import { blogs } from '@/db/schema'


export async function getBlogs() {
    const blogsData = await db.select()
        .from(blogs!)


    return blogsData
}