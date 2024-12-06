import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import { GoogleAnalytics } from "@next/third-parties/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./provider";
import { SessionProviderLazy } from "./session-provider";
import { ToastContainerLazy } from "@/components/ui/overlays/ToastContainer";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import AutoLogout from "@/components/AutoLogout";
import { Suspense } from "react";
import LoadingPage from "./loading";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import InitializeAccount from "@/components/InitializeAccount";
import GroupRedirect from "@/components/GroupRedirect";

export const metadata: Metadata = {
  title:
    "Idbook hotels™ - Official Site | Book Hotels According to Use & Save Up to 60% Cost",
  description:
    "Idbook hotels™ - The fastest and most convenient way to book hotels, save up to 60%. Explore holiday packages, group bookings, partner opportunities, corporate inquiries, and more. Download our app for seamless booking. Trusted by travel agents and customers worldwide. Visit our Blog, FAQs, or connect via Facebook, Twitter, Instagram, YouTube & LinkedIn.",
  icons: "fvicon.jpg",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className={poppins.className}>
      {process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID} />
        )}
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Suspense fallback={<LoadingPage />}>
          <SessionProviderLazy>
            <Providers>
              <InitializeAccount />
              <GroupRedirect />

              <AutoLogout />
              <NextTopLoader showSpinner={false} />
              <SiteHeader />
              {/* <CorporateSiteHeader /> */}
              <div className=" min-h-screen">{children}</div>
              <FooterNav />
              <Footer />
              <ToastContainerLazy />
            </Providers>
          </SessionProviderLazy>
        </Suspense>
      </body>
    </html>
  );
}
