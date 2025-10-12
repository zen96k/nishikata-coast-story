// src/tests/helpers/prisma.ts
import { PrismaClient } from "../../type/prisma/client.ts"

const dbClient = new PrismaClient()

export default dbClient
