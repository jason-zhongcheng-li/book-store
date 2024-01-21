import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient({ log: ["query"] });

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== "production") {
  console.log("Assign db to globalThis");
  globalThis.prisma = db;
}
