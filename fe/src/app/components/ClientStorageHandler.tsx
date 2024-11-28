"use client";

import { useEffect } from "react";
import useLastUpdateStore from "../stores/useLastUpdateStore";

const ClientStorageHandler = () => {
  const { lastUpdated } = useLastUpdateStore();

  const clearLocalStorageIfExpired = () => {
    if (lastUpdated) {
      const elapsedTime = Date.now() - lastUpdated;
      if (elapsedTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("nonMemberId");
        localStorage.removeItem("authToken");
        localStorage.removeItem("lastUpdated");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        clearLocalStorageIfExpired();
      },
      24 * 60 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return null;
};

export default ClientStorageHandler;
