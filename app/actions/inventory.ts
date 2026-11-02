'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getInventoryStock(category?: string) {
  try {
    const where: any = {};
    if (category && category !== 'ALL') where.category = category;

    const items = await prisma.inventoryItem.findMany({
      where,
      include: {
        transactions: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    const totalStockValue = items.reduce((sum, item) => sum + item.currentStock * item.unitCost, 0);
    const lowStockCount = items.filter((item) => item.currentStock <= item.minReorderLevel).length;

    return { success: true, items, totalStockValue, lowStockCount };
  } catch (error: any) {
    return { success: false, error: error.message, items: [], totalStockValue: 0, lowStockCount: 0 };
  }
}

export async function recordStockReceipt(data: {
  itemId: string;
  quantity: number;
  unitCost: number;
  referenceNo: string;
  vendorName?: string;
  receivedBy: string;
  notes?: string;
}) {
  try {
    const qty = Number(data.quantity) || 0;
    const cost = Number(data.unitCost) || 0;
    const totalVal = qty * cost;

    // 1. Create Stock Transaction
    const tx = await prisma.stockTransaction.create({
      data: {
        itemId: data.itemId,
        transactionType: 'GRN',
        quantity: qty,
        unitCost: cost,
        totalValue: totalVal,
        referenceNo: data.referenceNo,
        department: 'Central Stores',
        requestedBy: data.receivedBy,
        approvedBy: 'Storekeeper Najaf Ali',
        notes: data.notes || `Stock consignment received from ${data.vendorName || 'Vendor'}.`,
      },
    });

    // 2. Increment current stock
    await prisma.inventoryItem.update({
      where: { id: data.itemId },
      data: {
        currentStock: { increment: qty },
        unitCost: cost,
      },
    });

    // 3. Audit Log
    await prisma.auditLog.create({
      data: {
        userId: data.receivedBy,
        userName: data.receivedBy,
        userRole: 'STOREKEEPER',
        action: 'CREATE',
        module: 'INVENTORY',
        recordId: data.referenceNo,
        description: `Received GRN ${data.referenceNo}: ${qty} units (PKR ${totalVal.toLocaleString()})`,
      },
    });

    revalidatePath('/erp');
    return { success: true, transactionId: tx.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function issueStockToDepartment(data: {
  itemId: string;
  quantity: number;
  department: string;
  costCenter: string;
  issuedTo: string;
  issuedBy: string;
  notes?: string;
}) {
  try {
    const qty = Number(data.quantity) || 0;

    const item = await prisma.inventoryItem.findUnique({ where: { id: data.itemId } });
    if (!item) return { success: false, error: 'Item not found in store.' };

    if (item.currentStock < qty) {
      return {
        success: false,
        error: `Insufficient stock! Requested ${qty} ${item.unit}, but only ${item.currentStock} available.`,
      };
    }

    const totalVal = qty * item.unitCost;

    // 1. Create Stock Issue Transaction
    const tx = await prisma.stockTransaction.create({
      data: {
        itemId: data.itemId,
        transactionType: 'ISSUE',
        quantity: qty,
        unitCost: item.unitCost,
        totalValue: totalVal,
        referenceNo: `ISS-${Date.now().toString().slice(-6)}`,
        department: data.department,
        costCenter: data.costCenter,
        requestedBy: data.issuedTo,
        approvedBy: data.issuedBy,
        notes: data.notes || `Issued to ${data.department} for clinical/academic usage.`,
      },
    });

    // 2. Decrement current stock
    await prisma.inventoryItem.update({
      where: { id: data.itemId },
      data: {
        currentStock: { decrement: qty },
      },
    });

    // 3. Audit Log
    await prisma.auditLog.create({
      data: {
        userId: data.issuedBy,
        userName: data.issuedBy,
        userRole: 'STOREKEEPER',
        action: 'UPDATE',
        module: 'INVENTORY',
        recordId: tx.id,
        description: `Issued ${qty} units of ${item.name} to ${data.department} (${data.costCenter})`,
      },
    });

    revalidatePath('/erp');
    return { success: true, transactionId: tx.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
