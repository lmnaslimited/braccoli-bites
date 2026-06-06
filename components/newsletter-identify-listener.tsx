"use client"

import { useEffect } from "react"
import { identifyPostHogFormSubmitter } from "../lib/posthog-identify"

type TNewsletterSubscribedEvent = CustomEvent<{
  email?: string
  status?: "subscribed" | "already_subscribed" | "error"
}>

export default function NewsletterIdentifyListener() {
  useEffect(() => {
    const fnHandleNewsletterSubscribed = (iEvent: Event) => {
      const LdEvent = iEvent as TNewsletterSubscribedEvent

      // commented this out, to
      // Temporarily identify users based only on email presence.
      // This is a diagnostic change to verify whether the status-based
      // success check is preventing some newsletter subscribers from
      // being identified in PostHog.
      // if (
      //   !LdEvent.detail?.email ||
      //   !["subscribed", "already_subscribed"].includes(LdEvent.detail.status ?? "error")
      // ) {
      //   return
      // }
      if (!LdEvent.detail?.email) {
        return
      }  

      identifyPostHogFormSubmitter(
        { email: LdEvent.detail.email },
        {
          formId: "newsletter",
          formSource: "footer_newsletter",
          formTitle: "Footer newsletter",
          newsletterOptIn: true,
        },
      )
    }

    window.addEventListener("newsletter_subscribed", fnHandleNewsletterSubscribed)

    return () => {
      window.removeEventListener("newsletter_subscribed", fnHandleNewsletterSubscribed)
    }
  }, [])

  return null
}
