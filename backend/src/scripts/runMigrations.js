const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

const runMigrations = async () => {
  const client = await pool.connect();
  try {
    const migrationsDir = path.join(__dirname, '../../../database/migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    console.log('🚀 Starting migrations...');

    for (const file of files) {
      if (file.endsWith('.sql')) {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`Running migration: ${file}`);
        await client.query(sql);
      }
    }

    console.log('✅ All migrations applied successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
};

runMigrations();
