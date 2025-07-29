'use client';

import { useEffect, useState } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { PluginListenerHandle } from '@capacitor/core';
import { useRouter } from 'next/navigation';

type NotificationData = {
  title: string;
  body: string;
  userId?: string;
  target?: string;
};

export const NotificationDisplay = () => {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const router = useRouter();

  useEffect(() => {
    let listenerHandle: PluginListenerHandle;

    const setupListener = async () => {
      listenerHandle = await PushNotifications.addListener(
        'pushNotificationReceived',
        (notif) => {
          console.log('📬 Received:', JSON.stringify(notif));

          const newNotification = {
            title: notif.title || notif.notification?.title || 'No Title',
            body: notif.body || notif.notification?.body || 'No Body',
            userId: notif.data?.userId,
            target: notif.data?.target || '', // Store target
          };

          setNotification(newNotification);

          // Auto-remove after 5 seconds
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        }
      );
    };

    setupListener();

    return () => {
      if (listenerHandle) listenerHandle.remove();
    };
  }, []);

  if (!notification) return null;

  const handleClick = () => {
    if (notification.target) {
      console.log("🧭 Navigating to target:", notification.target);
      router.push(`/${notification.target}`);
      setNotification(null); // Dismiss notification
    }
  };

  return (
    <div
      className="fixed bottom-4 left-4 bg-white border shadow-lg p-4 rounded-xl max-w-xs z-50 cursor-pointer hover:shadow-xl transition"
      onClick={handleClick}
    >
      <h2 className="font-bold text-lg text-indigo-700">{notification.title}</h2>
      <p className="text-gray-700">{notification.body}</p>
      {notification.userId && (
        <p className="text-xs text-gray-500 mt-2">User ID: {notification.userId}</p>
      )}
      {notification.target && (
        <p className="text-xs text-blue-500 mt-1">Tap to open: /{notification.target}</p>
      )}
    </div>
  );
};
