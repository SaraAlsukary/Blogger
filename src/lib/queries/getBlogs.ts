import { db } from "@/db";
import { blogs, users } from '@/db/schema'
import { eq } from "drizzle-orm";


export async function getBlogs(id: number) {
    const blog = await db.select()
        .from(blogs)
        .where(eq(blogs.id, id)).innerJoin(users, eq(blogs.author, users.id))

    return blog[0]
}