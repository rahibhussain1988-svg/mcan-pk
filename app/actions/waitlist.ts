'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface WaitlistData {
  programCode: string; // CMW, LHV, CNA
  programName: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  notifyVia?: string;
}

export async function submitWaitlistRegistration(data: WaitlistData) {
  try {
    const entry = await prisma.programWaitlist.create({
      data: {
        programCode: data.programCode,
        programName: data.programName,
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        city: data.city?.trim() || 'Jacobabad',
        notifyVia: data.notifyVia || 'WHATSAPP',
      },
    });

    revalidatePath('/');
    revalidatePath('/programs');

    return {
      success: true,
      entry,
    };
  } catch (error: any) {
    console.error('Error registering for waitlist:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit waitlist registration',
    };
  }
}
