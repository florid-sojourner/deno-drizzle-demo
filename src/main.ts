import { Hono } from "@hono/hono";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./controllers/users.ts";

const app = new Hono();

// User routes
app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

Deno.serve({ port: 8000 }, app.fetch);

