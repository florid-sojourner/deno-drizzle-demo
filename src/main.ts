import { db } from "../drizzle/db.ts";
import { UserTable } from "../drizzle/schema.ts";


await db.insert(UserTable).values({
    name: "John Doe",
})

const user = await db.select().from(UserTable);

console.log(user);

