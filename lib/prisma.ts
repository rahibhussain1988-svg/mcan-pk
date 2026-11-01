import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Handle Vercel serverless read-only filesystem by copying seeded SQLite DB to /tmp if running on Vercel
if (process.env.VERCEL) {
  const tmpDbPath = '/tmp/dev.db';
  if (!fs.existsSync(tmpDbPath)) {
    const sourceDb = path.join(process.cwd(), 'prisma', 'dev.db');
    if (fs.existsSync(sourceDb)) {
      try {
        fs.copyFileSync(sourceDb, tmpDbPath);
      } catch (err) {
        console.error('Failed to copy SQLite db to /tmp on Vercel:', err);
      }
    }
  }
  process.env.DATABASE_URL = 'file:/tmp/dev.db';
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Ensure SQLite WAL mode for concurrency
prisma.$queryRawUnsafe('PRAGMA journal_mode = WAL;').catch(() => {});
