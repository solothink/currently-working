import React, { useState, Fragment, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";
import Avatar from "@/shared/Avatar";
import avatar1 from "@/images/avatars/default.webp";
import moment from "moment";

export interface NotifyBarProps {
  className?: string;
  iconClassName?: string;
}
const NotifyBar: React.FC<NotifyBarProps> = ({
  className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
  iconClassName = "h-8 w-8",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { notificationsQuery, markAsReadMutation } = useNotifications();
  const router = useRouter();

  const handleOpenNotifyBar = () => setIsVisible(true);
  const handleCloseNotifyBar = () => setIsVisible(false);

  const handleNotificationClick = (notification: any) => {
    if (notification.redirect_url) {
      router.push(notification.redirect_url);
    }
    markAsReadMutation.mutate(notification.id);
    handleCloseNotifyBar();
  };

  useEffect(() => {
    // Close notification bar when the route changes
    setIsVisible(false);
  }, [router]);

  return (
    <>
      <button
        onClick={handleOpenNotifyBar}
        className={`relative focus:outline-none flex items-center justify-center ${className}`}
      >
        {notificationsQuery.data?.some(
          (notification) => !notification.is_read,
        ) && (
          <span className="w-2 h-2 bg-blue-500 absolute top-0 right-0 rounded-full"></span>
        )}
        <BellIcon className={iconClassName} />
      </button>

      <Transition appear show={isVisible} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={handleCloseNotifyBar}
        >
          <Transition.Child
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 dark:bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex justify-end min-h-full">
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 transform"
                enterFrom="opacity-0 translate-x-56"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-56"
              >
                <Dialog.Panel className="w-full max-w-md bg-white dark:bg-neutral-900 transform overflow-hidden transition-all">
                  <div className="p-6 flex items-center justify-between border-b dark:border-neutral-700">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <button onClick={handleCloseNotifyBar}>
                      <span className="sr-only">Close</span>✕
                    </button>
                  </div>

                  <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-76px)]">
                    {notificationsQuery.isLoading ? (
                      <p>Loading notifications...</p>
                    ) : notificationsQuery.data?.length === 0 ? (
                      <p>No notifications.</p>
                    ) : (
                      notificationsQuery.data?.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="flex items-center p-2 pr-8 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer relative"
                        >
                          <Avatar
                            imgUrl={notification.profile_url || avatar1}
                            sizeClass="w-10 h-10"
                          />
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {moment(notification.created).fromNow()}
                            </p>
                          </div>
                          {!notification.is_read && (
                            <span className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NotifyBar;
