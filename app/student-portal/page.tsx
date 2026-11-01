import ERPPage from '@/app/erp/page';

export const dynamic = 'force-dynamic';

export default async function StudentPortalRoute() {
  return <ERPPage searchParams={{ tab: 'student', role: 'student' }} />;
}
