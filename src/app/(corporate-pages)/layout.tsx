import { auth } from "@/auth";
import CorporateSiteHeader from "../(client-components)/(Header)/CorporateSiteHeader";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    // const userCategory = session.user?.category;
    // if (userCategory !== "CL-ADMIN" && userCategory !== "CL-CUST") {
    //   const redirectPath = "/unauthorized";
    //   redirect(redirectPath); // Redirect if the user is not logged in
    // }
  } else {
    redirect("/login");
  }
  return (
    <section>
      {/* <CorporateSiteHeader /> */}
      {children}
    </section>
  );
}
