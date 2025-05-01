import {
    pgTable,
    text,
    uuid,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
    uuid: uuid("uuid").defaultRandom().primaryKey(),
    name: text(),
});