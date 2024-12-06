// src/components/AutoLogout.tsx
"use client"; // This component runs on the client side

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react"; // Import the useSession hook from next-auth
import { useRouter } from "next/navigation"; // Use next/navigation for redirection

const AutoLogout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if the session status is loading
    if (status === "loading") return;

    // If there's a token refresh error, redirect to the login page
    if (session?.error === "RefreshAccessTokenError") {
      console.log("Token refresh error detected, signing out...");

      // Optional: Call the sign-out API route to clear cookies
      signOut();

      // Redirect to login page
      //   router.push("/login");
    }
  }, [session, status, router]);

  return null; // This component doesn't need to render anything
};

export default AutoLogout;
