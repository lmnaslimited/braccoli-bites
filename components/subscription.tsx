"use client";
import { type ReactElement, useActionState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  subscribeNewsletter,
  type TnewsletterSubscriptionState,
} from "@repo/ui/api/newsletter/create-subscription";
import { TblogArticle } from "@repo/middleware/types";


// This component renders a newsletter subscription form.
export function NewsletterSubscription({
  idProps,
}: {
  idProps: TblogArticle["ctasection"];
}): ReactElement {
  const LdInitialState: TnewsletterSubscriptionState = {
    message: "",
    status: "error",
  };
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    LdInitialState,
  );

   // Previous implementation dispatched the newsletter_subscribed event
  // only after receiving a successful server action response.
  // Temporarily disabled for investigation because some production users
  // appear to subscribe successfully but never trigger PostHog identify.
  // We now dispatch the event immediately on form submission to determine
  // whether the server-response flow is causing identify events to be missed.
  // useEffect(() => {
  //   if (
  //     typeof window === "undefined" ||
  //     !LdState.email ||
  //     !["subscribed", "already_subscribed"].includes(LdState.status)
  //   ) {
  //     return
  //   }

  //   window.dispatchEvent(
  //     new CustomEvent("newsletter_subscribed", {
  //       detail: { email: LdState.email, status: LdState.status },
  //     }),
  //   )
  // }, [LdState.email, LdState.status])


  return (
    <section className="w-full py-6">
      <div className="container mx-auto px2 md:px-6">
        <div className="mx-auto w-full max-w-2xl ">
          <div className="space-y-6 text-center m-0">
            <form
              action={formAction}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
              onSubmit={(e) => {
                // Dispatch the newsletter_subscribed event immediately when the user
                // submits the form. This bypasses the dependency on the server action
                // response and helps verify whether delayed or missing responses are
                // preventing PostHog user identification for some subscribers.
                const LdFormData = new FormData(e.currentTarget)
                const LEmail = LdFormData.get("email")
            
                if (typeof LEmail === "string" && LEmail.trim()) {
                  window.dispatchEvent(
                    new CustomEvent("newsletter_subscribed", {
                      detail: {
                        email: LEmail.trim().toLowerCase(),
                      },
                    }),
                  )
                }
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder={idProps.buttons[0]?.description}
                required
                className="h-11 flex-1"
              />

              <Button type="submit" disabled={pending} className="h-11 px-6">
                {pending ? "Subscribing..." : idProps.buttons[0]?.label}
              </Button>
            </form>

            {state?.message ? (
              <p className="text-sm text-primary">{state.message}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
