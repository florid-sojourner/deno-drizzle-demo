import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import { Pool } from "pg";

const dbUrl = Deno.env.get("DATABASE_URL");
if (!dbUrl) throw new Error("DATABASE_URL environment variable is required");

const client = new Pool({
  connectionString: dbUrl,
  max: 1,
});

export const db = drizzle(client, { schema, logger: true });



