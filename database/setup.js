const bcrypt = require("bcrypt");
const db = require("./connect");

async function setupDatabase() {
  db.serialize(async () => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT DEFAULT '',
        role TEXT DEFAULT 'user'
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    const hash = await bcrypt.hash(adminPass, 10);

    db.run(
      `INSERT OR IGNORE INTO users(username,password,role) VALUES(?,?,?)`,
      [adminUser, hash, "admin"]
    );

    console.log("Database setup complete.");
  });
}

module.exports = setupDatabase;