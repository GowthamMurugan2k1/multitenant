import Sidebar from "@/components/RootComps/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-2 grid grid-cols-[200px_1fr] w-full gap-4  bg-gradient-to-b from-[#4747e0] via-[#e4e4f7] to-white/15 ">
      <Sidebar />
      <div className="overflow-auto">{children}</div>
    </main>
  );
}
