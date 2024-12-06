import SiteHeader from "../(client-components)/(Header)/SiteHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="py-4">{children}</div>
    </section>
  );
}
