// Safe Prisma Client Wrapper
// This prevents Next.js from crashing if @prisma/client is not yet installed.

let db: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client');
  
  const globalForPrisma = global as unknown as { prisma: any };
  
  db = globalForPrisma.prisma || new PrismaClient();
  
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
} catch (error) {
  console.warn("⚠️ Prisma Client is not installed. Please run 'npm install @prisma/client prisma' and 'npx prisma generate'.");
  
  // Provide mock implementation to prevent runtime errors during UI development
  db = {
    customer: {
      findUnique: async () => null,
      create: async (data: any) => ({ id: 'mock-id', ...data.data }),
    },
    lead: {
      create: async (data: any) => ({ id: 'mock-lead-id', ...data.data }),
    },
    whatsAppConversation: {
      findFirst: async () => null,
      create: async (data: any) => ({ id: 'mock-conv-id', ...data.data }),
      update: async (data: any) => ({ id: 'mock-conv-id', ...data.data }),
    },
    whatsAppMessage: {
      findUnique: async () => null,
      create: async (data: any) => ({ id: 'mock-msg-id', ...data.data }),
      update: async (data: any) => ({ id: 'mock-msg-id', ...data.data }),
    },
  };
}

export { db };
