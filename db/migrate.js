// youtube-dashboard-backend/db/migrate.js
const fs = require('fs').promises;
const path = require('path');
const pool = require('./pool');

async function runMigrations() {
  try {
    const migrationDir = path.join(__dirname, '../migrations');
    const files = await fs.readdir(migrationDir);
    files.sort(); 

    const client = await pool.connect();
    try {
      for (const file of files) {
        if (file.endsWith('.sql')) {
          const sql = await fs.readFile(path.join(migrationDir, file), 'utf8');
          console.log(`Running migration: ${file}`);
          await client.query(sql);
        }
      }
      console.log('All migrations completed');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();