import { AuthAdminProvider } from "@/firebase/admin/AdminContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthAdminProvider>
    {children}
    </AuthAdminProvider>
  );
}
