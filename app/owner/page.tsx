import ERPPage from '@/app/erp/page';

export const dynamic = 'force-dynamic';

export default async function OwnerRoute() {
  return <ERPPage searchParams={{ tab: 'owner', role: 'owner' }} />;
}
