const { existsSync } = require("fs");
const path = require("path");

const envFile = existsSync(
  path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
)
  ? `.env.${process.env.NODE_ENV}`
  : ".env";

require("dotenv").config({
  path: envFile,
});

/**
 * PostgreSQL migration configuration
 * It uses environment variables with default fallback values in case they are not provided.
 * `dialect` is set to "postgresql" for PostgreSQL migrations.
 */
const pgMigrationConfig = {
  host: process.env.POSTGRES || "localhost", // PostgreSQL host
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || "postgres", // PostgreSQL username
  password: process.env.POSTGRES_PASSWORD || "postgres", // PostgreSQL password
  database: process.env.POSTGRES_DATABASE || "express-boilerplate", // PostgreSQL database name
  dialect: "postgres", // Specify the dialect for PostgreSQL
};

module.exports = pgMigrationConfig;
