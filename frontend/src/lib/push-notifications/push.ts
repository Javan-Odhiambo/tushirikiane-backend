import { urlBase64ToUint8Array } from "./utils";

import { PushSubscription } from "web-push";

const SERVICE_WORKER_FILE_PATH = "./sw.js";

export function notificationUnsupported(): boolean {
  let unsupported = false;
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("showNotification" in ServiceWorkerRegistration.prototype)
  ) {
    unsupported = true;
  }
  return unsupported;
}

export function checkPermissionStateAndAct(
  onSubscribe: (subs: PushSubscription | null) => void
): void {
  const state: NotificationPermission = Notification.permission;
  switch (state) {
    case "denied":
      break;
    case "granted":
      registerAndSubscribe(onSubscribe);
      break;
    case "default":
      break;
  }
}

async function subscribe(
  onSubscribe: (subs: PushSubscription | null) => void
): Promise<void> {
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!vapidPublicKey) {
    console.error(
      "VAPID public key is not defined in the environment variables."
    );
    return;
  }
  navigator.serviceWorker.ready
    .then((registration: ServiceWorkerRegistration) => {
      console.info("Service Worker is ready: ", registration);
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    })
    .then((subscription: PushSubscription) => {
      console.info("Created subscription Object: ", subscription);
      submitSubscription(subscription).then((_) => {
        onSubscribe(subscription);
      });
    })
    .catch((e) => {
      console.error("Failed to subscribe cause of: ", e);
    });
}

async function submitSubscription(
  subscription: PushSubscription
): Promise<void> {
  const endpointUrl = "/api/web-push/subscription";
  const res = await fetch(endpointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscription }),
  });
  const result = await res.json();
  console.log(result);
}

export async function registerAndSubscribe(
  onSubscribe: (subs: PushSubscription | null) => void
): Promise<void> {
  try {
    await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH);
    await subscribe(onSubscribe);
  } catch (e) {
    console.error("Failed to register service-worker: ", e);
  }
}

export async function sendWebPush(message: string | null): Promise<void> {
  const endPointUrl = "/api/web-push/send";
  const pushBody = {
    title: "Test Push",
    body: message ?? "This is a test push message",
    image: "/next.png",
    icon: "nextjs.png",
    url: "https://google.com",
  };
  const res = await fetch(endPointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pushBody),
  });
  const result = await res.json();
  console.log(result);
}
