export interface FinancialPulse {
  todayCashInHand: number;
  bankDeposits: number;
  monthlyFeeCollection: number;
  monthlyCollectionTarget: number;
  collectionTargetPercent: number;
  monthlyExpenses: number;
  monthlyPayroll: number;
  netOperatingSurplus: number;
  totalReceivables: number;
  cashRunwayMonths: number;
  budgetAlertsCount: number;
}

export function computeLateFine(dueDate: Date, ratePerDay = 100): number {
  const now = new Date();
  if (now <= dueDate) return 0;
  const diffTime = Math.abs(now.getTime() - dueDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays * ratePerDay;
}

export function generateVoucherNumber(count: number): string {
  const padded = String(count + 1).padStart(4, '0');
  return `CPV-2026-${padded}`;
}

export function generateReceiptNumber(count: number): string {
  const padded = String(count + 1).padStart(5, '0');
  return `RCPT-2026-${padded}`;
}

export function generateChallanNumber(count: number): string {
  const padded = String(count + 1).padStart(5, '0');
  return `CHL-2026-${padded}`;
}

export function generateWhatsAppReminder(params: {
  studentName: string;
  fatherName: string;
  rollNo: string;
  phone: string;
  challanNo: string;
  dueAmount: number;
  dueDate: string;
  lang: 'en' | 'ur' | 'sd';
}): string {
  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  let message = '';

  if (params.lang === 'ur') {
    message = `محترم جناب ${params.fatherName} صاحب!
امام انسٹی ٹیوٹ آف نرسنگ اینڈ الائیڈ ہیلتھ سائنسز کی جانب سے یاد دہانی ہے کہ آپ کے فرزند/دختر ${params.studentName} (رول نمبر: ${params.rollNo}) کی سمسٹر فیس چالان نمبر ${params.challanNo} کے مطابق واجب الادا رقم PKR ${params.dueAmount.toLocaleString()} ہے۔
برائے مہربانی تاریخ ${params.dueDate} تک حبیب بینک لمیٹڈ کی کسی بھی برانچ یا کیمپس اکاؤنٹس کاؤنٹر پر جمع کروا کر امتحانی رول نمبر سلپ جاری کروائیں۔ شکریہ!`;
  } else if (params.lang === 'sd') {
    message = `محترم سائين ${params.fatherName}!
امام انسٽيٽيوٽ آف نرسنگ اينڊ الائيڊ هيلٿ سائنسز طرفان ياد ڏياري وڃي ٿي ته اوهان جي فرزند/نياڻي ${params.studentName} (رول نمبر: ${params.rollNo}) جي سمسٽر فيس چالان نمبر ${params.challanNo} موجب واجب الادا رقم PKR ${params.dueAmount.toLocaleString()} آهي.
مهرباني ڪري تاريخ ${params.dueDate} تائين ايڇ بي ايل جي ڪنهن به برانچ يا ڪيمپس اڪائونٽس ڊيسڪ تي جمع ڪرائي امتحاني سلپ حاصل ڪريو. مهرباني!`;
  } else {
    message = `Dear Guardian (${params.fatherName}),
This is an official fee reminder from Imam Institute of Nursing & Allied Health Sciences.
Student: ${params.studentName} (Roll No: ${params.rollNo})
Challan No: ${params.challanNo}
Outstanding Amount: PKR ${params.dueAmount.toLocaleString()}
Due Date: ${params.dueDate}

Please deposit the dues at any Habib Bank Limited (HBL) branch or at the Campus Cashier Desk to avoid after-due-date fines and unlock the Examination Roll Number Slip. Thank you.`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
