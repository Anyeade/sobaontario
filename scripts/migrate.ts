import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon } from '@neondatabase/serverless';

async function runMigrations() {
  console.log('🔄 Running migrations...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);
    
    await migrate(db, { migrationsFolder: './lib/db/migrations' });
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 