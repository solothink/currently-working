"use client";

import { useSession } from "next-auth/react"; // Import the useSession hook
import { usePropertiesByUserIdAndStatus } from "@/hooks/useProperty"; // Import the custom hook for fetching properties
import ActiveProperties from "./_components/ActiveProperties";
import SectionHeader from "./_components/SectionHeader";
import EmptyState from "./_components/EmptyState";
import InProgressProperties from "./_components/InProgressProperties";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { redirect } from "next/navigation";

export default function PropertiesPage() {
  const { data: session } = useSession(); // Get session data from NextAuth
  const userId = session?.user?.id; // Extract user ID from the session data

  // Fetch in-progress properties
  const {
    data: inProgressProperties,
    isLoading: isLoadingInProgress,
    isError: isErrorInProgress,
  } = usePropertiesByUserIdAndStatus(String(userId ?? ''), "In-Progress");

  // Fetch active properties
  const {
    data: activeProperties,
    isLoading: isLoadingActive,
    isError: isErrorActive,
  } = usePropertiesByUserIdAndStatus(String(userId ?? ''), "Active");

  if (isLoadingInProgress || isLoadingActive) {
    return <div>Loading...</div>; // Optionally, show a loading state
  }

  if (isErrorInProgress || isErrorActive) {
    return <div>Error fetching properties.</div>; // Optionally, show an error state
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-semibold text-neutral-800">
            My Properties
          </h1>
          <ButtonPrimary href="/add-listing">+ Create New</ButtonPrimary>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* In Progress Section */}
        <section className="mb-6">
          <SectionHeader
            title="In Progress"
            count={inProgressProperties?.data?.length || 0}
          />
          {(inProgressProperties?.data?.length ?? 0 > 0) ? (
            <InProgressProperties
              properties={inProgressProperties?.data ?? []}
            />
          ) : (
            <EmptyState />
          )}
        </section>

        {/* Active Properties Section */}
        <section>
          <SectionHeader
            title="Active Properties"
            count={activeProperties?.data?.length || 0}
          />
          {(activeProperties?.data?.length ?? 0 > 0) ? (
            <ActiveProperties properties={activeProperties?.data ?? []} />
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
    </div>
  );
}
