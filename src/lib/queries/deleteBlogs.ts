
import { db } from "@/db";
import { blogs } from '@/db/schema'
import { eq } from "drizzle-orm";


export async function deleteBlog(id: number) {
    const blog = await db.delete(blogs)
        .where(eq(blogs.id, id))

    return blog
}