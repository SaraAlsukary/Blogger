import { db } from "@/db";
import { blogs, users } from '@/db/schema'
import { eq } from "drizzle-orm";


export async function getMyBlogs(id: string) {
    const blog = await db.select()
        .from(blogs)
        .where(eq(blogs.author, id)).innerJoin(users, eq(blogs.author, users.id))

    return blog
}