"use client";

import { useEffect, useCallback } from "react";
import useLastUpdateStore from "../stores/useLastUpdateStore";

function ClientStorageHandler() {
  const { lastUpdated } = useLastUpdateStore();

  const clearLocalStorageIfExpired = useCallback(() => {
    if (lastUpdated) {
      const elapsedTime = Date.now() - lastUpdated;
      if (elapsedTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("nonMemberId");
        localStorage.removeItem("authToken");
        localStorage.removeItem("lastUpdated");
      }
    }
  }, [lastUpdated]);

  useEffect(() => {
    const interval = setInterval(() => {
      clearLocalStorageIfExpired();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [clearLocalStorageIfExpired]);

  return null;
}

export default ClientStorageHandler;
