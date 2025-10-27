import fs from "fs";
import path from "path";
import pool from "../index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlFilePath = path.join(__dirname, "sample_data.sql");

async function seedDatabase() {
  try {
    const sql = fs.readFileSync(sqlFilePath, "utf-8");
    console.log("Seeding database with sample data...");

    await pool.query(sql);
    console.log("Database seeded successfully!");

    pool.end();
  } catch (err) {
    console.error("Error while seeding database:", err.message);
    pool.end();
  }
}

seedDatabase();
