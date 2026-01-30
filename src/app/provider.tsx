"use client"
import { db } from '@/db/index'
import { users } from '@/db/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser()

    const syncUserToDatabase = async () => {
        if (!user?.id || !user?.primaryEmailAddress?.emailAddress) return;

        try {
            const email = user.primaryEmailAddress.emailAddress;
            const result = await db.select().from(users).where(eq(users.email, email));

            if (result.length === 0) {
                // Create new user with Clerk ID
                await db.insert(users).values({
                    id: user.id,
                    email: email,
                    name: user.fullName || '',
                    image: user.imageUrl || ''
                });
                console.log('New user created in database');
            } else {
                // Update existing user with Clerk ID
                await db.update(users)
                    .set({
                        id: user.id,
                        name: user.fullName || '',
                        image: user.imageUrl || '',
                    })
                    .where(eq(users.email, email));
                console.log('User updated in database');
            }
        } catch (error) {
            console.error('Error syncing user to database:', error);
        }
    }

    useEffect(() => {
        if (user) {
            syncUserToDatabase();
        }
    }, [user])

    return (
        <div>
            {children}
        </div>
    )
}

export default Provider