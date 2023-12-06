import Bar from "../../components/Bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden bg-[#f4f4f4] text-dark-blue">
      <Bar />
      <main className="over h-full overflow-y-scroll">{children}</main>
    </section>
  );
}
