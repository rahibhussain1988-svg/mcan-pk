import { getERPData } from '@/lib/erp-data';
import { AppShell } from '@/components/AppShell';

export const dynamic = 'force-dynamic';

interface ERPPageProps {
  searchParams?: {
    tab?: string;
    role?: string;
  };
}

export default async function ERPPage({ searchParams }: ERPPageProps) {
  const initialData = await getERPData();

  return (
    <AppShell
      initialData={initialData}
      initialTab={searchParams?.tab}
      initialRole={searchParams?.role}
    />
  );
}
