"use client";

import { useEffect, useState } from "react";
import {
  checkPermissionStateAndAct,
  notificationUnsupported,
  registerAndSubscribe,
  sendWebPush,
} from "./push";
import { Button } from "@mantine/core";

export default function PushManager() {
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    const isUnsupported = notificationUnsupported();
    setUnsupported(isUnsupported);
    if (isUnsupported) {
      return;
    }
    checkPermissionStateAndAct(setSubscription);
  }, []);

  return (
    <main>
      <div>
        <Button
          disabled={unsupported}
          onClick={() => registerAndSubscribe(setSubscription)}
        >
          {unsupported
            ? "Notification Unsupported"
            : subscription
            ? "Notification allowed"
            : "Allow notification"}
        </Button>
        {subscription ? (
          <>
            <input
              placeholder={"Type push message ..."}
              style={{ marginTop: "5rem" }}
              value={message ?? ""}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={() => sendWebPush(message)}>Test Web Push</Button>
          </>
        ) : null}
        <div>
          <span>Push subscription:</span>
        </div>
        <code>
          {subscription
            ? JSON.stringify(subscription, undefined, 2)
            : "There is no subscription"}
        </code>
      </div>
    </main>
  );
}
