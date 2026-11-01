export interface VitalsInput {
  respRate: number;
  spo2: number;
  onOxygen: boolean;
  systolicBp: number;
  diastolicBp?: number;
  heartRate: number;
  temperature: number;
  bloodSugar?: number;
  painScale: number; // 0 - 10
  avpuGcs: 'ALERT' | 'VOICE' | 'PAIN' | 'UNRESPONSIVE';
}

export interface NEWS2Result {
  score: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  breakdown: {
    respScore: number;
    spo2Score: number;
    oxygenScore: number;
    bpScore: number;
    hrScore: number;
    tempScore: number;
    avpuScore: number;
  };
  recommendation: string;
}

export interface ESIResult {
  level: number; // 1 to 5
  categoryName: string;
  colorHex: string;
  recommendedAction: string;
  redFlags: string[];
}

export function calculateNEWS2(vitals: VitalsInput): NEWS2Result {
  let respScore = 0;
  if (vitals.respRate <= 8) respScore = 3;
  else if (vitals.respRate >= 9 && vitals.respRate <= 11) respScore = 1;
  else if (vitals.respRate >= 12 && vitals.respRate <= 20) respScore = 0;
  else if (vitals.respRate >= 21 && vitals.respRate <= 24) respScore = 2;
  else if (vitals.respRate >= 25) respScore = 3;

  let spo2Score = 0;
  if (vitals.spo2 <= 91) spo2Score = 3;
  else if (vitals.spo2 >= 92 && vitals.spo2 <= 93) spo2Score = 2;
  else if (vitals.spo2 >= 94 && vitals.spo2 <= 95) spo2Score = 1;
  else spo2Score = 0;

  const oxygenScore = vitals.onOxygen ? 2 : 0;

  let bpScore = 0;
  if (vitals.systolicBp <= 90) bpScore = 3;
  else if (vitals.systolicBp >= 91 && vitals.systolicBp <= 100) bpScore = 2;
  else if (vitals.systolicBp >= 101 && vitals.systolicBp <= 110) bpScore = 1;
  else if (vitals.systolicBp >= 111 && vitals.systolicBp <= 219) bpScore = 0;
  else if (vitals.systolicBp >= 220) bpScore = 3;

  let hrScore = 0;
  if (vitals.heartRate <= 40) hrScore = 3;
  else if (vitals.heartRate >= 41 && vitals.heartRate <= 50) hrScore = 1;
  else if (vitals.heartRate >= 51 && vitals.heartRate <= 90) hrScore = 0;
  else if (vitals.heartRate >= 91 && vitals.heartRate <= 110) hrScore = 1;
  else if (vitals.heartRate >= 111 && vitals.heartRate <= 130) hrScore = 2;
  else if (vitals.heartRate >= 131) hrScore = 3;

  const avpuScore = vitals.avpuGcs === 'ALERT' ? 0 : 3;

  let tempScore = 0;
  if (vitals.temperature <= 35.0) tempScore = 3;
  else if (vitals.temperature >= 35.1 && vitals.temperature <= 36.0) tempScore = 1;
  else if (vitals.temperature >= 36.1 && vitals.temperature <= 38.0) tempScore = 0;
  else if (vitals.temperature >= 38.1 && vitals.temperature <= 39.0) tempScore = 1;
  else if (vitals.temperature >= 39.1) tempScore = 2;

  const totalScore =
    respScore + spo2Score + oxygenScore + bpScore + hrScore + avpuScore + tempScore;

  let risk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let recommendation = 'Ward-based monitoring every 4 to 6 hours.';

  if (totalScore >= 7) {
    risk = 'HIGH';
    recommendation =
      'Emergency Medical Alert: Continuous monitoring, urgent review by Imam Medical Center Critical Care / Senior Registrar.';
  } else if (
    totalScore >= 5 ||
    respScore === 3 ||
    spo2Score === 3 ||
    bpScore === 3 ||
    hrScore === 3 ||
    avpuScore === 3
  ) {
    risk = 'MEDIUM';
    recommendation =
      'Urgent ward-level response: hourly vital signs check and preceptor clinical assessment.';
  }

  return {
    score: totalScore,
    risk,
    breakdown: {
      respScore,
      spo2Score,
      oxygenScore,
      bpScore,
      hrScore,
      tempScore,
      avpuScore,
    },
    recommendation,
  };
}

export function calculateESI(
  vitals: VitalsInput,
  chiefComplaint: string
): ESIResult {
  const redFlags: string[] = [];
  const lowerComplaint = chiefComplaint.toLowerCase();

  // ESI Level 1: Immediate Resuscitation Needed
  if (
    vitals.avpuGcs === 'UNRESPONSIVE' ||
    vitals.spo2 < 85 ||
    vitals.respRate > 32 ||
    vitals.respRate < 8 ||
    vitals.heartRate > 130 ||
    vitals.systolicBp < 80 ||
    lowerComplaint.includes('cardiac arrest') ||
    lowerComplaint.includes('severe breathlessness') ||
    lowerComplaint.includes('cyanotic')
  ) {
    if (vitals.spo2 < 85) redFlags.push('Severe Hypoxia (SpO2 < 85%)');
    if (vitals.respRate > 32) redFlags.push(`Critical Tachypnea (RR ${vitals.respRate})`);
    if (vitals.heartRate > 130) redFlags.push(`Severe Tachycardia (HR ${vitals.heartRate})`);
    if (vitals.avpuGcs === 'UNRESPONSIVE') redFlags.push('Unresponsive / Comatose state');

    return {
      level: 1,
      categoryName: 'Immediate Resuscitation',
      colorHex: '#E30613', // Crimson Red
      recommendedAction: 'Immediate Resuscitation Bay. Assign Senior BSN Student for Emergency Airway & Oxygenation Assist.',
      redFlags,
    };
  }

  // ESI Level 2: High Risk / Severe Pain / Disorientation
  if (
    vitals.avpuGcs === 'VOICE' ||
    vitals.avpuGcs === 'PAIN' ||
    vitals.painScale >= 8 ||
    vitals.spo2 <= 92 ||
    vitals.heartRate > 115 ||
    vitals.systolicBp > 190 ||
    lowerComplaint.includes('chest pain') ||
    lowerComplaint.includes('radiating') ||
    lowerComplaint.includes('stroke') ||
    lowerComplaint.includes('seizure')
  ) {
    if (vitals.painScale >= 8) redFlags.push(`Severe Acute Pain (${vitals.painScale}/10)`);
    if (vitals.spo2 <= 92) redFlags.push(`Moderate Hypoxia (SpO2 ${vitals.spo2}%)`);
    if (lowerComplaint.includes('chest pain')) redFlags.push('Potential Acute Coronary Syndrome (ACS)');

    return {
      level: 2,
      categoryName: 'Very Urgent (Emergent)',
      colorHex: '#DC2626',
      recommendedAction: 'Place in Acute Monitoring Bay within 10 minutes. 12-Lead ECG & Vascular Access indicated.',
      redFlags,
    };
  }

  // ESI Level 3: Multiple Resources Needed (IV line, blood labs, nebulization)
  if (
    (vitals.bloodSugar && vitals.bloodSugar > 300) ||
    vitals.temperature >= 38.5 ||
    vitals.painScale >= 5 ||
    lowerComplaint.includes('vomiting') ||
    lowerComplaint.includes('dehydration') ||
    lowerComplaint.includes('abdominal pain') ||
    lowerComplaint.includes('fever')
  ) {
    if (vitals.bloodSugar && vitals.bloodSugar > 300) redFlags.push(`Hyperglycemia (${vitals.bloodSugar} mg/dL)`);
    if (vitals.temperature >= 38.5) redFlags.push(`High Fever (${vitals.temperature}°C)`);

    return {
      level: 3,
      categoryName: 'Urgent',
      colorHex: '#D97706', // Amber
      recommendedAction: 'Secondary Triage Ward. Supervised Student IV Cannulation & Blood Sampling.',
      redFlags,
    };
  }

  // ESI Level 4: Single Resource Needed (suture/wound care or single medication)
  if (
    lowerComplaint.includes('laceration') ||
    lowerComplaint.includes('cut') ||
    lowerComplaint.includes('wound') ||
    lowerComplaint.includes('sprain') ||
    lowerComplaint.includes('suture')
  ) {
    return {
      level: 4,
      categoryName: 'Standard (Less Urgent)',
      colorHex: '#2563EB',
      recommendedAction: 'Minor Procedure Room. Supervised Student Wound Dressing & Tetanus Administration.',
      redFlags,
    };
  }

  // ESI Level 5: Non-Urgent / 0 Resources
  return {
    level: 5,
    categoryName: 'Non-Urgent (Fast-Track)',
    colorHex: '#008060', // Emerald Green
    recommendedAction: 'Outpatient Fast-Track Clinic. Routine consultation & prescription counseling.',
    redFlags,
  };
}

export function matchStudentCompetency(esiLevel: number, complaint: string): { code: string; title: string; rationale: string } {
  const c = complaint.toLowerCase();
  if (c.includes('breath') || c.includes('respir') || c.includes('wheez') || esiLevel === 1) {
    return {
      code: 'ABG_SAMPLING',
      title: 'Arterial Blood Gas (ABG) Radial Artery Sampling',
      rationale: 'Hypoxia / respiratory distress requires arterial blood gas sampling and critical airway supervision.',
    };
  }
  if (c.includes('chest pain') || c.includes('heart') || c.includes('palpitat') || esiLevel === 2) {
    return {
      code: 'ECG_12_LEAD',
      title: '12-Lead Electrocardiogram (ECG) Recording',
      rationale: 'Chest pain protocol requires immediate 12-lead ECG lead placement within 10 minutes of arrival.',
    };
  }
  if (c.includes('wound') || c.includes('lacerat') || c.includes('cut') || c.includes('injury')) {
    return {
      code: 'WOUND_CARE',
      title: 'Aseptic Surgical Wound Dressing & Suture Care',
      rationale: 'Traumatic laceration requires sterile antiseptic irrigation, dressing, and documentation.',
    };
  }
  if (c.includes('urinary') || c.includes('retention') || c.includes('catheter')) {
    return {
      code: 'FOLEY_CATHETER',
      title: 'Indwelling Foley Catheterization',
      rationale: 'Urinary retention or strict fluid balance monitoring requires aseptic closed drainage catheterization.',
    };
  }
  // Default to IV cannulation
  return {
    code: 'IV_CANNULATION',
    title: 'Peripheral Intravenous (IV) Cannulation (18G–22G)',
    rationale: 'Emergency hydration and intravenous drug administration require secure venous access.',
  };
}
