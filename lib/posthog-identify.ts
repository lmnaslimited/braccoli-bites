"use client"

import posthog from "posthog-js"

type TIdentifyContext = {
  formId: string
  formTitle?: string
  formSource: string
  lastCaseStudyName?: string
  newsletterOptIn?: boolean
}

type TIdentifyFormData = {
  email?: unknown
  name?: unknown
  phone?: unknown
}
// Normalize an email address and verify its format
const fnNormalizeEmail = (iEmail?: unknown) => {
  if (typeof iEmail !== "string") return null

  const LEmail = iEmail.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(LEmail) ? LEmail : null
}

// Trim string values and discard empty inputs
const fnStringProperty = (iValue?: unknown) => {
  if (typeof iValue !== "string") return undefined

  const LValue = iValue.trim()
  return LValue || undefined
}

// Identify and associate form submitters with PostHog user profiles
export function identifyPostHogFormSubmitter(
  idFormData: TIdentifyFormData,
  idContext: TIdentifyContext,
) {
  // Normalize and validate the submitted email address
  const LEmail = fnNormalizeEmail(idFormData.email)

  if (!LEmail) return

  const LSubmittedAt = new Date().toISOString()
  const LSetProperties: Record<string, unknown> = {
    email: LEmail,
    last_form_id: idContext.formId,
    last_form_source: idContext.formSource,
    last_submitted_at: LSubmittedAt,
  }

  // Extract and sanitize optional form fields
  const LName = fnStringProperty(idFormData.name)
  const LPhone = fnStringProperty(idFormData.phone)
  const LFormTitle = fnStringProperty(idContext.formTitle)
  const LCaseStudyName = fnStringProperty(idContext.lastCaseStudyName)

  // Add optional user and form metadata when available
  if (LName) LSetProperties.name = LName
  if (LPhone) LSetProperties.phone = LPhone
  if (LFormTitle) LSetProperties.last_form_title = LFormTitle
  if (LCaseStudyName) LSetProperties.last_case_study_name = LCaseStudyName
  if (idContext.newsletterOptIn) LSetProperties.newsletter_opt_in = true

  // Store first-submission properties only once for the user
  const LSetOnceProperties: Record<string, unknown> = {
    first_form_id: idContext.formId,
    first_form_source: idContext.formSource,
    first_submitted_at: LSubmittedAt,
  }

  // Record the first downloaded case study for attribution
  if (LCaseStudyName) LSetOnceProperties.first_case_study_name = LCaseStudyName

  // Identify the user and persist profile properties in PostHog
  posthog.identify(
    LEmail,
    LSetProperties,
    LSetOnceProperties,
  )
}
