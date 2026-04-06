import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/app/db/schema.js", // pointing schema file
  out: "./drizzle", // migration file will be generate in this folder
  dialect: "postgresql", // using Postgres
  dbCredentials: {
    url: process.env.DATABASE_URL, // connection string from .env.local
  },
});
