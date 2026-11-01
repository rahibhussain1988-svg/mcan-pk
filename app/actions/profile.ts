'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(data: {
  userId: string;
  fullName: string;
  phone: string;
  cnic: string;
  emergencyContact?: string;
  address?: string;
  language: string;
  tableDensity: string;
  notificationsEnabled: boolean;
}) {
  const profile = await prisma.userProfilePreference.upsert({
    where: { userId: data.userId },
    update: {
      fullName: data.fullName,
      phone: data.phone,
      cnic: data.cnic,
      emergencyContact: data.emergencyContact || undefined,
      address: data.address || undefined,
      language: data.language,
      tableDensity: data.tableDensity,
      notificationsEnabled: data.notificationsEnabled,
    },
    create: {
      userId: data.userId,
      fullName: data.fullName,
      email: `${data.userId}@imaminstitute.edu.pk`,
      phone: data.phone,
      cnic: data.cnic,
      designation: 'Staff Member',
      language: data.language,
      tableDensity: data.tableDensity,
      notificationsEnabled: data.notificationsEnabled,
    },
  });

  revalidatePath('/');
  return { success: true, profile };
}
