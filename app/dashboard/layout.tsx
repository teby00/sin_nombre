import SideBar from '@/components/SideBar';
import { getSession } from '@/lib/getSession';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = await getSession();
  return (
    <div className="relative z-10">
      <SideBar isAdmin={isAdmin} />
      <main className="ml-[300px] py-8 px-10">{children}</main>
    </div>
  );
}
