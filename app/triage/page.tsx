import ERPPage from '@/app/erp/page';

export const dynamic = 'force-dynamic';

export default async function TriageRoute() {
  return <ERPPage searchParams={{ tab: 'triage', role: 'triage' }} />;
}
