'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface JobApplicationData {
  position: string;
  fullName: string;
  gender?: string;
  email: string;
  phone: string;
  cnic: string;
  highestQualification: string;
  yearsExperience: number;
  pncRegistrationNo?: string;
  currentOrganization?: string;
  coverLetter?: string;
}

export async function submitJobApplication(data: JobApplicationData) {
  try {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const applicationNo = `JOB-2026-${randomDigits}`;

    const jobApp = await prisma.jobApplication.create({
      data: {
        applicationNo,
        position: data.position || 'Principal (MSN)',
        fullName: data.fullName.trim(),
        gender: data.gender || 'MALE',
        email: data.email.trim(),
        phone: data.phone.trim(),
        cnic: data.cnic.trim(),
        highestQualification: data.highestQualification.trim(),
        yearsExperience: Number(data.yearsExperience) || 0,
        pncRegistrationNo: data.pncRegistrationNo?.trim() || null,
        currentOrganization: data.currentOrganization?.trim() || null,
        coverLetter: data.coverLetter?.trim() || null,
        status: 'PENDING_REVIEW',
      },
    });

    // Create owner approval notification for HR/Recruitment
    await prisma.ownerApprovalItem.create({
      data: {
        title: `HR Recruitment: ${data.fullName} applied for ${data.position}`,
        type: 'HR_RECRUITMENT',
        referenceId: applicationNo,
        requestedBy: `${data.fullName} (Applicant)`,
        details: `Qualification: ${data.highestQualification}, Experience: ${data.yearsExperience} yrs, Phone: ${data.phone}, PNC Reg: ${data.pncRegistrationNo || 'N/A'}`,
        status: 'PENDING',
      },
    });

    revalidatePath('/erp');
    revalidatePath('/news-careers');

    return {
      success: true,
      applicationNo,
      jobApp,
    };
  } catch (error: any) {
    console.error('Error submitting job application:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit application',
    };
  }
}
