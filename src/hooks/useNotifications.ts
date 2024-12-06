// hooks/useNotifications.ts
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import NotificationService, { Notification } from "@/lib/notification-service";
import { useSession } from "next-auth/react";

const POLLING_INTERVAL = 5000; // Polling every 5 seconds

export const useNotifications = (): {
  notificationsQuery: UseQueryResult<Notification[], Error>;
  markAsReadMutation: UseMutationResult<void, Error, number>;
} => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const notificationsQuery = useQuery<Notification[], Error>({
    queryKey: ["userNotifications"],
    queryFn: NotificationService.getUserNotifications,
    refetchInterval: POLLING_INTERVAL,
    refetchIntervalInBackground: true,
    staleTime: 0,
    enabled: !!token, // Only fetch if token exists

  });

  const markAsReadMutation = useMutation<void, Error, number>({
    mutationFn: NotificationService.markAsRead,
    onSuccess: () => {
      notificationsQuery.refetch();
    },
  });

  return { notificationsQuery, markAsReadMutation };
};
