// // src/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Next.js automatically loads .env.local - no need for dotenv.config()
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle(sql);

// import { neon } from '@neondatabase/serverless';
// import { config } from 'dotenv';
// import { drizzle } from 'drizzle-orm/neon-http';

// config({ path: '.env' })

// const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
// export const db = drizzle({ client: sql });
