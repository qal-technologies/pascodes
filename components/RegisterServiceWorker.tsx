"use client";

import { useEffect } from "react";

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registered:", reg);
        })
        .catch((err) => {
          console.error("SW registration failed:", err);
        });
    });
  }
}

/**
 * Send a message to the service worker to cache paid resources.
 * urls: string[] - absolute or relative URLs that the service worker can fetch.
 */
export async function cachePaidResources(urls: string[]) {
  if (!("serviceWorker" in navigator)) return;
  const sw = await navigator.serviceWorker.ready;
  sw.active?.postMessage({ action: "CACHE_PAID_RESOURCES", urls });
}

/**
 * Clear cached paid course resources
 */
export async function clearCoursesCache() {
  if (!("serviceWorker" in navigator)) return;
  const sw = await navigator.serviceWorker.ready;
  sw.active?.postMessage({ action: "CLEAR_COURSES_CACHE" });
}

// Hook you can call at root
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    registerServiceWorker();
  }, []);
  return null;
}
