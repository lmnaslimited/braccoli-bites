import { draftMode } from "next/headers"
// Maps Next.js draft mode to Strapi publication status

export async function fnGetStatus() {
  const { isEnabled } = await draftMode()
  return isEnabled ? "DRAFT" : "PUBLISHED"
}
