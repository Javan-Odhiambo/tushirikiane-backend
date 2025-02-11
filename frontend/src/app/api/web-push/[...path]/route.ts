import { NextRequest } from "next/server";
import webpush, { PushSubscription } from "web-push";

webpush.setVapidDetails(
  "mailto:mail@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription;

export async function POST(request: NextRequest) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case "/api/web-push/subscription":
      return setSubscription(request);
    case "/api/web-push/send":
      return sendPush(request);
    default:
      return notFoundApi();
  }
}

async function setSubscription(request: NextRequest) {
  const body: { subscription: PushSubscription } = await request.json();
  subscription = body.subscription;
  return new Response(JSON.stringify({ message: "Subscription set." }), {});
}

async function sendPush(request: NextRequest) {
  console.log(subscription, "subs");
  const body = await request.json();
  const pushPayload = JSON.stringify(body);
  await webpush.sendNotification(subscription, pushPayload);
  return new Response(JSON.stringify({ message: "Push sent." }), {});
}

async function notFoundApi() {
  return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
    headers: { "Content-Type": "application/json" },
    status: 404,
  });
}
