import { getERPData } from '@/lib/erp-data';
import { AppShell } from '@/components/AppShell';
import PublicWebsitePage from '@/app/website/page';

export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams?: {
    tab?: string;
    role?: string;
    view?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  if (searchParams?.view === 'erp' || searchParams?.tab || searchParams?.role) {
    const initialData = await getERPData();
    return (
      <AppShell
        initialData={initialData}
        initialTab={searchParams?.tab}
        initialRole={searchParams?.role}
      />
    );
  }

  return <PublicWebsitePage />;
}
