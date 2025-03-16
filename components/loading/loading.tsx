"use client";

import { HeartCrack, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { LoadingProps } from "@/components/loading/loading.d";

export default function Loading({ serviceName }: LoadingProps) {
  const [serviceStatus, setServiceStatus] = useState<boolean>(true);

  const messages = {
    loading: "loading",
    serviceUnavailable: `service ${serviceName ?? ""} unavailable`,
  };

  useEffect(() => {
    const TIMEOUT_DELAY = 7000;

    const timeout = setTimeout(() => {
      setServiceStatus(false);
    }, TIMEOUT_DELAY);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="loading
        flex
        flex-row
        items-center
        justify-center
        p-3
        relative
        rounded-xl"
    >
      {serviceStatus ? (
        <>
          <Loader2
            className="animate-spin
              duration-500
              mr-3"
            color="#0ea5e9"
            width={32}
            height={32}
          />
          <span
            className="loader
              animate-pulse
              duration-500
              block
              text-white/30
              text-sm"
          >
            {messages.loading}
          </span>
        </>
      ) : (
        <>
          <HeartCrack
            className="mr-3 opacity"
            color="#FFFFFF33"
            width={24}
            height={24}
          />
          <span
            className="loader
              block
              text-white/20
              text-sm"
          >
            {messages.serviceUnavailable}
          </span>
        </>
      )}
    </div>
  );
}
