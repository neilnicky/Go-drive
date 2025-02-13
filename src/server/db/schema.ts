import { int, text, mysqlTable } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  age: int("age").notNull(),
});