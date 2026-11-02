'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAuditLogs(limit: number = 50, moduleFilter?: string) {
  try {
    const where: any = {};
    if (moduleFilter && moduleFilter !== 'ALL') where.module = moduleFilter;

    const logs = await prisma.auditLog.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      logs: logs.map((l) => ({
        ...l,
        createdAt: l.createdAt.toISOString(),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message, logs: [] };
  }
}

export async function logAuditEvent(data: {
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  recordId?: string;
  description: string;
  previousState?: string;
  newState?: string;
  ipAddress?: string;
}) {
  try {
    const log = await prisma.auditLog.create({
      data: {
        userId: data.userId,
        userName: data.userName,
        userRole: data.userRole,
        action: data.action,
        module: data.module,
        recordId: data.recordId,
        description: data.description,
        previousState: data.previousState,
        newState: data.newState,
        ipAddress: data.ipAddress || '127.0.0.1',
      },
    });

    revalidatePath('/erp');
    return { success: true, logId: log.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
