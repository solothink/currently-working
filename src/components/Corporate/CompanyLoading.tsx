import { FC } from "react"; // Ensure you're using React types
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Make sure the import path is correct

export const LoadingState: FC = () => {
  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information Skeleton */}
        <SkeletonCard />

        {/* Contact Information Skeleton */}
        <SkeletonCard />

        {/* Legal Information Skeleton */}
        <SkeletonCard />

        {/* Location Information Skeleton */}
        <SkeletonCard />

        {/* Status Information Skeleton */}
        <Card className="bg-white dark:bg-neutral-800 shadow-md md:col-span-2 overflow-hidden">
          <CardHeader className="border-b border-neutral-200 dark:border-neutral-700">
            <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, idx) => (
              <SkeletonRow key={idx} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Reusable SkeletonCard Component to avoid repetition
const SkeletonCard: FC = () => (
  <Card className="bg-white dark:bg-neutral-800 shadow-md overflow-hidden">
    <CardHeader className="border-b border-neutral-200 dark:border-neutral-700">
      <div className="h-6 w-36 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
    </CardHeader>
    <CardContent className="p-6 space-y-4">
      {Array.from({ length: 2 }).map((_, idx) => (
        <SkeletonRow key={idx} />
      ))}
    </CardContent>
  </Card>
);

// Reusable SkeletonRow Component
const SkeletonRow: FC = () => (
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mt-1" />
    <div className="flex-1">
      <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-2" />
      <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
    </div>
  </div>
);
