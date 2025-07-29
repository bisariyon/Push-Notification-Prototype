import { PushNotifications } from "@capacitor/push-notifications";

export const initPushNotifications = async (
  onTokenReceived?: (token: string) => void
) => {
  console.log("🔔 Initializing push notifications...");

  let permissionStatus = await PushNotifications.checkPermissions();
  if (permissionStatus.receive !== "granted") {
    permissionStatus = await PushNotifications.requestPermissions();
  }

  if (permissionStatus.receive !== "granted") {
    console.warn("🚫 Push permission not granted");
    return;
  }

  await PushNotifications.register();

  PushNotifications.addListener("registration", async (token) => {
    console.log("✅ FCM Token:", token.value);
    if (onTokenReceived) onTokenReceived(token.value);
    localStorage.setItem("fcmToken", token.value);
  });

  PushNotifications.addListener(
    "pushNotificationReceived",
    async (notification) => {
      console.log("📬 Received:", JSON.stringify(notification));
    }
  );

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    async (notification) => {
      const target = notification.notification?.data?.target;

      console.log(
        "📲 Notification action performed:",
        JSON.stringify(notification)
      );

      localStorage.removeItem("pendingTarget");

      if (target) {
        console.log("➡️ Notification tapped with valid target:", target);
        localStorage.setItem("pendingTarget", target);

        // Fire event for live apps
        const event = new CustomEvent("notification-navigate", {
          detail: { target },
        });
        window.dispatchEvent(event);
        localStorage.removeItem("pendingTarget");
      } else {
        console.log(
          "❌ Notification tapped but no target. Clearing pending target."
        );
        localStorage.removeItem("pendingTarget");
      }
    }
  );
};
