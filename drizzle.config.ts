import type { Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB_NAME,
    port: parseInt(env.SINGLESTORE_PORT),
  },
  verbose: true,
  strict: true,
} satisfies Config;
