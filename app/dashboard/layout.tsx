import SideBar from '@/components/SideBar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10">
      <SideBar />
      <main className="ml-[300px] py-8 px-10">{children}</main>
    </div>
  );
}
