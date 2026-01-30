CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"category" text,
	"image" varchar,
	"date" date
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image" varchar
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;