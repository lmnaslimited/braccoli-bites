"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    // Initializing PostHog
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: "/ingest",
            ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            defaults: "2026-01-30",
            capture_exceptions: true,
            debug: process.env.NODE_ENV === "development",
        });
    }, []);
    return <>{children}</>
}