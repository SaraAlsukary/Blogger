import { NextRequest, NextResponse } from "next/server";
import { writeFile } from 'fs/promises'
import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import { TBlog } from "@/types/dataBlogType";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
    try {
        const blog = await db.delete(blogs)
            .where(eq(blogs.id, +request.nextUrl.searchParams.get('id')!))
        return NextResponse.json(blog);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}   

export async function GET() {
    try {
        const allBlogs = await db.select().from(blogs).innerJoin(users, eq(blogs.author, users.id));
        return NextResponse.json(allBlogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); 
        const timestamp = Date.now();

        const image = formData.get('image') as File | null; 

        const title = formData.get('title')?.toString();

        const description = formData.get('description')?.toString();
        const category = formData.get('category')?.toString();
        const author = formData.get('author')?.toString();

        if (!title || !description || !category || !author || !image) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!image.type.startsWith('image/')) {
            return NextResponse.json(
                { error: "File must be an image" },
                { status: 400 }
            );
        }

        const imageBytes = await image.arrayBuffer();
        const buffer = Buffer.from(imageBytes);

        const fileName = `${timestamp}_${image.name}`;
        const path = `./public/uploads/${fileName}`; 

        await writeFile(path, buffer);

        const imageUrl = `/uploads/${fileName}`; 

        const blogData: TBlog = {
            title,
            description,
            category,
            author,
            date: new Date().toISOString().split("T")[0],
            image: imageUrl
        };

        const [newBlog] = await db.insert(blogs).values(blogData!).returning();

        return NextResponse.json(
            { message: "Blog Created Successfully", blog: newBlog, success: true },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json(
            { message: "Failed to create blog" },
            { status: 500 }
        );
    }
}