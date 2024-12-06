"use client";

import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

export default function SessionProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const SessionProviderLazy = dynamic(() => import("./session-provider"), {
  ssr: false,
});
