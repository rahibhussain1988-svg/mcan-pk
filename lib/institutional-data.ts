export interface ProgramDetail {
  code: string;
  name: string;
  category: 'degree' | 'paramedical' | 'upcoming';
  duration: string;
  affiliation: string;
  seats: number;
  openAdmissions: boolean;
  freeInitiative: boolean;
  eligibility: string;
  description: string;
  highlights: string[];
}

export interface ClinicalPartner {
  id: string;
  name: string;
  shortName: string;
  city: string;
  beds: string;
  type: string;
  role: string;
  description: string;
  badge: string;
  features: string[];
}

export const INSTITUTIONAL_DATA = {
  name: 'Imam Institute of Nursing & Allied Health Sciences',
  shortName: 'Imam Institute',
  fullLegalName: 'Imam Institute of Nursing & Allied Health Sciences (and Paramedical)',
  domain: 'imcan.pk',
  established: 2019,
  address: {
    street: 'Shah Ghazi Muhalla, Imam Baksh Road',
    city: 'Jacobabad',
    province: 'Sindh',
    country: 'Pakistan',
    postalCode: '79200',
    full: 'Shah Ghazi Muhalla, Imam Baksh Road, Jacobabad, Sindh, Pakistan',
  },
  contact: {
    phone: '+92 300 2320085',
    whatsapp: '+92 300 2320085',
    email: 'Imcjcd@gmail.com',
    hours: '8:00 AM – 4:00 PM (Monday – Saturday)',
  },
  leadership: {
    ceo: {
      name: 'Dr. Abid Hussain Soomro',
      title: 'Chief Executive Officer',
      quote: 'Every aspiring healthcare professional deserves the opportunity to learn, grow, and succeed.',
      credentials: 'MBBS, MPH — Healthcare Leadership & Medical Educator',
    },
    chairman: {
      name: 'Mr. Sajid Hussain',
      title: 'Chairman & Managing Director',
      quote: 'Empowering Sindh through world-class clinical nursing training and career-ready paramedical sciences.',
    },
    ms: {
      name: 'Dr. Hamid Hussain',
      title: 'Director & Medical Superintendent, Imam Medical Center',
    },
  },
  metrics: {
    studentsEnrolled: '500+',
    yearsExcellence: '5+',
    qualifiedFaculty: '15+',
    healthcareTracks: '10+',
    clinicalBeds: '133+',
    placementRate: '98%',
  },
  vision:
    'Imam Institute of Nursing envisions developing skilled human resource in nursing field while enabling them for incoming generation, reducing unemployment and contributing in socio-economic stability.',
  mission:
    'To create an academic, learning and collaborative environment for the preparation of caring, competent and professional nurses, who will accomplish their role in hospital and community.',
  accreditations: [
    {
      id: 'sindh-govt',
      name: 'Government of Sindh',
      badge: 'Charter Approved',
      description: 'Fully approved by Health Department, Government of Sindh.',
      category: 'Government Charter',
    },
    {
      id: 'pnmc',
      name: 'Pakistan Nursing & Midwifery Council (PNMC)',
      badge: 'Federal Regulatory',
      description: 'Officially registered and recognized under PNMC statutory regulations.',
      category: 'Regulatory Council',
    },
    {
      id: 'smbbmu',
      name: 'SMBBMU Larkana',
      badge: 'University Affiliated',
      description: 'Shaheed Mohtarma Benazir Bhutto Medical University, Larkana — BSN Degree awarding university.',
      category: 'Degree Affiliation',
    },
    {
      id: 'smf',
      name: 'Sindh Medical Faculty (SMF) Karachi',
      badge: 'Diploma Board',
      description: 'Sindh Medical Faculty Karachi examination and diploma certification authority.',
      category: 'Paramedical Faculty',
    },
    {
      id: 'stevta',
      name: 'STEVTA Sindh',
      badge: 'Vocational Council',
      description: 'Sindh Technical Education & Vocational Training Authority accreditation.',
      category: 'Technical Board',
    },
    {
      id: 'pharmacy-council',
      name: 'Pharmacy Council of Sindh',
      badge: 'Professional Body',
      description: 'Affiliated with the Pharmacy Council for allied pharmaceutical curricula.',
      category: 'Regulatory Council',
    },
    {
      id: 'tcf-partner',
      name: 'The Citizens Foundation (TCF)',
      badge: 'Alumni Pathway',
      description: 'Proud Education Partner with dedicated scholarship seats for TCF alumni.',
      category: 'Education Partner',
    },
    {
      id: 'peef-scholarships',
      name: 'PEEF & Merit Scholarships',
      badge: 'Need & Merit Aid',
      description: 'Punjab Educational Endowment Fund (PEEF) and institutional financial assistance.',
      category: 'Financial Aid',
    },
  ],
  programs: [
    {
      code: 'BSN',
      name: 'BS Nursing (Generic)',
      category: 'degree',
      duration: '4 Years (8 Semesters)',
      affiliation: 'PNMC Registered & SMBBMU Larkana Affiliated',
      seats: 50,
      openAdmissions: true,
      freeInitiative: false,
      eligibility: 'FSc Pre-Medical (Minimum 50% Marks) · Age: 17–35 Years',
      description:
        'Our flagship 4-year professional degree preparing clinical nurses with intensive bedside training at Imam Medical Center and JIMS 133-Bed Hospital.',
      highlights: [
        'PNMC Registered Curriculum',
        'SMBBMU Larkana University Degree',
        'Direct House Job pathway at GMMMC Sukkur',
        'Advanced FON Museum & Anatomy Labs',
      ],
    },
    {
      code: 'XRAY',
      name: 'X-Ray Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 30,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric Science / Biology (Minimum 45% Marks)',
      description: 'Comprehensive diagnostic radiography, darkroom procedures, and digital X-ray operation.',
      highlights: ['Free Admissions Initiative', 'Live Hospital Darkroom Training', 'SMF Karachi Certification'],
    },
    {
      code: 'ECG',
      name: 'ECG Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 30,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric Science (Minimum 45% Marks)',
      description: '12-lead electrocardiography, rhythm strip interpretation, and emergency cardiac monitoring.',
      highlights: ['Free Admissions Initiative', 'Bedside Cardiac Ward Exposure', 'Hands-on Machine Handling'],
    },
    {
      code: 'ICU',
      name: 'ICU Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 25,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric / FSc Science',
      description: 'Critical care equipment monitoring, ventilator circuit setup, and arterial line assisting.',
      highlights: ['Free Admissions Initiative', 'Intensive Care Unit Rotations', 'JIMS 133-bed Clinical Rotations'],
    },
    {
      code: 'PHYSIO',
      name: 'Physiotherapy Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 25,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric Science',
      description: 'Rehabilitative exercise, electrotherapy modalities, and post-operative mobility support.',
      highlights: ['Free Admissions Initiative', 'Outpatient Physical Rehab Clinic', 'SMF Karachi Affiliated'],
    },
    {
      code: 'PEADS',
      name: 'PEADS (Pediatric) Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 25,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric Science',
      description: 'Neonatal resuscitation, pediatric immunization, nutritional triage, and child ward care.',
      highlights: ['Free Admissions Initiative', 'Dedicated Pediatric Ward Rotations', 'Child Healthcare Certification'],
    },
    {
      code: 'DENTAL',
      name: 'Dental Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 20,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric Science',
      description: 'Chairside dental assistance, sterilization protocol, prosthodontics impression casting.',
      highlights: ['Free Admissions Initiative', 'Dental Operatory Hands-on', 'STEVTA Verified'],
    },
    {
      code: 'ANESTH',
      name: 'Anaesthesia Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 20,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric / FSc Science',
      description: 'Operating theatre anaesthetic gas workstation preparation and intraoperative monitoring.',
      highlights: ['Free Admissions Initiative', 'Major Surgery OT Rotations', 'Civil Hospital Jacobabad Partner'],
    },
    {
      code: 'OPHTHALMIC',
      name: 'Ophthalmic Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 20,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric Science',
      description: 'Visual acuity screening, slit lamp assistance, and ophthalmic surgical preparation.',
      highlights: ['Free Admissions Initiative', 'Eye OPD & Cataract Surgery Units', 'SMF Karachi Diploma'],
    },
    {
      code: 'BLOOD_TRANSFUSION',
      name: 'Blood Transfusion Technician',
      category: 'paramedical',
      duration: '1 Year Diploma',
      affiliation: 'Sindh Medical Faculty (SMF) & STEVTA',
      seats: 20,
      openAdmissions: true,
      freeInitiative: true,
      eligibility: 'Matric Science',
      description: 'Blood crossmatching, apheresis protocols, safe transfusion verification, and cold chain maintenance.',
      highlights: ['Free Admissions Initiative', 'Clinical Blood Bank Training', 'High Regional Demand'],
    },
    // Upcoming Pathways
    {
      code: 'CMW',
      name: 'Community Midwifery (CMW)',
      category: 'upcoming',
      duration: '2 Years Diploma',
      affiliation: 'Pakistan Nursing & Midwifery Council (PNMC)',
      seats: 30,
      openAdmissions: false,
      freeInitiative: false,
      eligibility: 'Matric Science (45% Marks) · Female Candidates Only',
      description: 'Maternal health, safe childbirth practices, and community maternal care across rural Sindh.',
      highlights: ['Priority Alert Registration Open', 'PNMC Accredited Pathway', 'Stipend Eligible'],
    },
    {
      code: 'LHV',
      name: 'Lady Health Visitor (LHV)',
      category: 'upcoming',
      duration: '2 Years Diploma',
      affiliation: 'Sindh Medical Faculty (SMF)',
      seats: 30,
      openAdmissions: false,
      freeInitiative: false,
      eligibility: 'Matric Science (45% Marks) · Female Candidates Only',
      description: 'Primary maternal and child health, immunization schedules, and family planning counseling.',
      highlights: ['Priority Alert Registration Open', 'Community Health Leadership', 'Government Clinic Career'],
    },
    {
      code: 'CNA',
      name: 'Certified Nursing Assistant (CNA)',
      category: 'upcoming',
      duration: '2 Years Diploma',
      affiliation: 'Pakistan Nursing & Midwifery Council (PNMC)',
      seats: 30,
      openAdmissions: false,
      freeInitiative: false,
      eligibility: 'Matric Arts or Science (45% Marks)',
      description: 'Essential nursing care, patient hygiene, bedside vitals recording, and clinical assistance.',
      highlights: ['Priority Alert Registration Open', 'Fast-Track Hospital Entry', 'PNMC Recognized'],
    },
  ] as ProgramDetail[],

  clinicalPartners: [
    {
      id: 'imc',
      name: 'Imam Medical Center',
      shortName: 'IMC Jacobabad',
      city: 'Jacobabad',
      beds: '50+ Beds',
      type: 'Primary Teaching Hospital',
      role: 'Supervised bedside care, acute nursing, and daily clinical rotation.',
      badge: 'Campus Partner Hospital',
      description:
        'Our own on-site and sister medical center where students undergo foundational clinical drills, supervised medication administration, and patient vitals telemetry.',
      features: ['24/7 Emergency & ICU', 'Digital Radiology & Lab', 'Direct Preceptor Mentorship'],
    },
    {
      id: 'jims',
      name: 'Jacobabad Institute of Medical Sciences (JIMS)',
      shortName: 'JIMS (133-Bed)',
      city: 'Jacobabad',
      beds: '133 Beds',
      type: 'Tertiary Care Hospital',
      role: 'High-acuity emergency, surgical wards, pediatric ICU, and modern inpatient care.',
      badge: '133-Bed Clinical Partner',
      description:
        'A premier 133-bed modern medical facility providing Imam Institute students extensive clinical exposure in advanced surgical, neonatal, and critical care specialties.',
      features: ['133 Inpatient Beds', 'Modular Surgical Theatres', 'Comprehensive Diagnostics'],
    },
    {
      id: 'civil-hospital',
      name: 'Civil Hospital Jacobabad',
      shortName: 'Civil Hospital',
      city: 'Jacobabad',
      beds: '200+ Beds',
      type: 'Public Sector Hospital',
      role: 'Broad community health exposure and diverse patient case volumes.',
      badge: 'Public Sector Partner',
      description:
        'Jacobabad’s central government hospital exposing students to high patient inflow, trauma triage, infectious diseases, and community-wide medical services.',
      features: ['High Patient Inflow', 'Trauma & Disaster Triage', 'Public Health Outreach'],
    },
    {
      id: 'gmmmc',
      name: 'Ghulam Muhammad Mahar Medical College (GMMMC)',
      shortName: 'GMMMC Teaching Hospital',
      city: 'Sukkur',
      beds: '500+ Beds',
      type: 'Constituent SMBBMU University Institution',
      role: 'Graduate House Job Pathways & Tertiary Rotations.',
      badge: 'House Job Pathway',
      description:
        'As an affiliated college of SMBBMU Larkana, our BS Nursing graduates qualify for premier clinical House Job placements and specialized internship rotations at GMMMC Sukkur.',
      features: ['House Job Pathway for Graduates', 'Specialized Super-Specialties', 'SMBBMU Constituent Campus'],
    },
  ] as ClinicalPartner[],

  campusFacilities: [
    {
      title: 'Fundamentals of Nursing (FON) Museum',
      subtitle: 'Clinical Skills Simulator & History',
      description: 'High-fidelity anatomical mannequins, simulated hospital ward setups, and nursing instrumentation.',
      tag: 'Skills Simulation',
    },
    {
      title: 'Anatomy & Physiology Lab',
      subtitle: 'Human Structural Exploration',
      description: 'Detailed 3D anatomical organ models, articulated human skeletons, and histology slide stations.',
      tag: 'Pre-Clinical',
    },
    {
      title: 'Digital & Smart Classrooms',
      subtitle: 'Interactive Audio-Visual Learning',
      description: 'High-definition projectors, digital lecture recording, and interactive case study displays.',
      tag: 'Interactive Tech',
    },
    {
      title: 'Modern Central Computer Lab',
      subtitle: 'Digital Health & Research',
      description: 'High-speed internet workstations for online health journals, e-logbooks, and SMBBMU portal testing.',
      tag: 'E-Learning',
    },
    {
      title: 'Institutional Central Library',
      subtitle: 'Clinical Knowledge Hub',
      description: 'Over 2,500+ nursing, pharmacological, and allied medical textbooks and journals.',
      tag: 'Academic Library',
    },
    {
      title: 'Diagnostic Science Lab',
      subtitle: 'Biochemistry & Microbiology',
      description: 'Binocular microscopes, incubators, autoclave units, and chemical testing apparatus.',
      tag: 'Diagnostics',
    },
  ],

  announcements: [
    {
      id: 'ann-1',
      date: 'Fall 2026–27',
      title: 'Admissions Open: BS Nursing Generic & 9 Paramedical Diplomas',
      summary: 'Online registration is now open with Free Admissions Initiative at Imam Paramedical Institute.',
      badge: 'Admissions Open',
      link: '/admissions',
    },
    {
      id: 'ann-2',
      date: 'November 2026',
      title: 'Entry Test & Merit List Announcement for BSN Batch 2026',
      summary: 'Official entry test scheduled at Main Campus Shah Ghazi Muhalla Jacobabad. Download admit slips online.',
      badge: 'Entry Test',
      link: '/admissions',
    },
    {
      id: 'ann-3',
      date: 'Recent Event',
      title: 'Annual White Coat Ceremony & Orientation Batch 2026',
      summary: 'Inspiring induction ceremony welcoming fresh nursing and paramedical students into clinical service.',
      badge: 'Campus Life',
      link: '/news-careers',
    },
    {
      id: 'ann-4',
      date: 'Academic Highlight',
      title: '2nd Nursing Seminar & SMBBMU International Collaboration',
      summary: 'Academic dialogue on emerging infection control and modern bedside patient advocacy.',
      badge: 'Academic Research',
      link: '/news-careers',
    },
  ],

  careers: {
    title: 'Hiring: Principal (Male / Female)',
    qualification: 'Master of Science in Nursing (MSN) or equivalent recognized by PNMC',
    experience: 'Relevant academic administration & nursing college leadership experience',
    location: 'Main Campus, Jacobabad, Sindh',
    deadline: 'Immediate Opening 2026',
    description:
      'Imam Institute invites applications from seasoned nursing educators with an MSN degree to lead our College of Nursing as Principal, driving PNMC compliance, clinical rotations, and academic excellence.',
  },
};
