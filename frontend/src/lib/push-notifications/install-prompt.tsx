"use client";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        notifications.show({
          title: "App installed",
          message: "",
        });
      }
      setDeferredPrompt(null);
    }
  };

  if (isStandalone) {
    return null;
  }

  return (
    <div>
      <h3>Install App</h3>
      {deferredPrompt && (
        <Button onClick={handleInstallClick} color="blue">
          Add to Home Screen
        </Button>
      )}
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button{" "}
          <span role="img" aria-label="share icon">
            ⎋
          </span>{" "}
          and then &quot;Add to Home Screen&quot;{" "}
          <span role="img" aria-label="plus icon">
            ➕
          </span>
          .
        </p>
      )}
    </div>
  );
}
