import { text, serial, varchar, pgTable, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
    id: varchar('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    image: varchar('image')
})




export const blogs = pgTable('blogs', {
    id: serial('id').primaryKey(),
    author: varchar("author").notNull().references(() => users.id),
    title: varchar('title').notNull(),
    description: text('description'),
    category: text('category'),
    image: varchar('image'),
    date: date('date'),

})


export const usersRelations = relations(users,
    ({ many }) => ({
        blogs: many(blogs)
    }))
export const blogsRelations = relations(blogs,
    ({ one }) => ({
        customer: one(users, {
            fields: [blogs.author],
            references: [users.id]
        })
    }))