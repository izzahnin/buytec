import { AuthAdminProvider } from "@/firebase/admin/AdminContext";
import Bar from "../../components/Bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthAdminProvider>
    <section className="flex h-screen overflow-hidden bg-[#f4f4f4] text-dark-blue">
      <Bar />
      <main className="over h-full overflow-y-scroll w-full">{children}</main>
    </section>
    // </AuthAdminProvider>
  );
}
