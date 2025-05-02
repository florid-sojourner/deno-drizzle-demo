import { Context } from "@hono/hono";
import { db } from "../../drizzle/db.ts";
import { UserTable } from "../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const getUsers = async (c: Context) => {
  const users = await db.select().from(UserTable);
  return c.json(users);
};

export const getUser = async (c: Context) => {
  const id = c.req.param("id");
  const user = await db.select().from(UserTable).where(eq(UserTable.uuid, id));
  
  if (!user.length) {
    return c.json({ error: "User not found" }, 404);
  }
  
  return c.json(user[0]);
};

export const createUser = async (c: Context) => {
  const body = await c.req.json();
  
  if (!body.name) {
    return c.json({ error: "Name is required" }, 400);
  }
  
  const user = await db.insert(UserTable).values({
    name: body.name,
  }).returning();
  
  return c.json(user[0], 201);
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  
  if (!body.name) {
    return c.json({ error: "Name is required" }, 400);
  }
  
  const user = await db.update(UserTable)
    .set({ name: body.name })
    .where(eq(UserTable.uuid, id))
    .returning();
    
  if (!user.length) {
    return c.json({ error: "User not found" }, 404);
  }
  
  return c.json(user[0]);
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");
  const user = await db.delete(UserTable)
    .where(eq(UserTable.uuid, id))
    .returning();
    
  if (!user.length) {
    return c.json({ error: "User not found" }, 404);
  }
  
  return c.json({ message: "User deleted successfully" });
}; 