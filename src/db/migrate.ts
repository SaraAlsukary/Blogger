import { migrate } from 'drizzle-orm/neon-http/migrator'
import { db } from '.'

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'src/db/migrations'
        })
        console.log('migration completed')
    } catch (error) {
        console.log('Error While Migration: ', error)
        process.exit(1)
    }
}

main()