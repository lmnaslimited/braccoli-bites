"use client";

import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

export default function ChatInit() {
    useEffect(() => {
        const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

        if (!webhookUrl) {
            console.warn("Chat disabled: webhook URL is missing");
            return;
        }

        createChat({
            webhookUrl,
            webhookConfig: {
                method: 'POST',
                headers: {}
            },
            mode: 'window',
            chatInputKey: 'chatInput',
            chatSessionKey: 'sessionId',
            loadPreviousSession: true,
            metadata: {},
            showWelcomeScreen: false,
            defaultLanguage: 'en',
        });
    }, []);

    return null;
}