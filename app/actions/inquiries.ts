'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface InquiryData {
  fullName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}

export async function submitContactInquiry(data: InquiryData) {
  try {
    const inquiry = await prisma.publicInquiry.create({
      data: {
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        subject: data.subject.trim(),
        message: data.message.trim(),
        status: 'NEW',
      },
    });

    revalidatePath('/contact');

    return {
      success: true,
      inquiry,
    };
  } catch (error: any) {
    console.error('Error submitting contact inquiry:', error);
    return {
      success: false,
      error: error.message || 'Failed to send message',
    };
  }
}
