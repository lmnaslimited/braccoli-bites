"use client"
import { type ReactElement, useActionState, useEffect } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import {
  subscribeNewsletter,
  type TnewsletterSubscriptionState,
} from "@repo/ui/api/newsletter/create-subscription"
import { TblogArticle } from "@repo/middleware/types"

export function NewsletterSubscription({idProps}: { idProps: TblogArticle["ctasection"] }): ReactElement {
  const LdInitialState: TnewsletterSubscriptionState = {
    message: "",
    status: "error",
  }

  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    LdInitialState,
  )

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !state.email ||
      !["subscribed", "already_subscribed"].includes(state.status)
    ) {
      return
    }

    window.dispatchEvent(
      new CustomEvent("newsletter_subscribed", {
        detail: {
          email: state.email,
          status: state.status,
        },
      }),
    )
  }, [state.email, state.status])
  console.log("CTA Props:", idProps.buttons); // Debug log to check the received props

  return (
    <section className="w-full py-6">
      <div className="container mx-auto px2 md:px-6">
        <div className="mx-auto w-full max-w-2xl ">
          <div className="space-y-6 text-center m-0">

            <form
              action={formAction}
  className="flex flex-col gap-4 sm:flex-row sm:items-center"            >
              <Input
                type="email"
                name="email"
                placeholder={idProps.buttons[0]?.description }
                required
                className="h-11 flex-1"
              />

              <Button
                type="submit"
                disabled={pending}
                className="h-11 px-6"
              >
                {pending ? "Subscribing..." : idProps.buttons[0]?.label}
              </Button>
            </form>

            {state?.message ? (
              <p className="text-sm text-primary">
                {state.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}