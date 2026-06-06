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

const fnNormalizeEmail = (iEmail?: unknown) => {
  if (typeof iEmail !== "string") return null

  const LEmail = iEmail.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(LEmail) ? LEmail : null
}

const fnStringProperty = (iValue?: unknown) => {
  if (typeof iValue !== "string") return undefined

  const LValue = iValue.trim()
  return LValue || undefined
}

export function identifyPostHogFormSubmitter(
  idFormData: TIdentifyFormData,
  idContext: TIdentifyContext,
) {
  const LEmail = fnNormalizeEmail(idFormData.email)

  if (!LEmail) return

  const LSubmittedAt = new Date().toISOString()
  const LSetProperties: Record<string, unknown> = {
    email: LEmail,
    last_form_id: idContext.formId,
    last_form_source: idContext.formSource,
    last_submitted_at: LSubmittedAt,
  }

  const LName = fnStringProperty(idFormData.name)
  const LPhone = fnStringProperty(idFormData.phone)
  const LFormTitle = fnStringProperty(idContext.formTitle)
  const LCaseStudyName = fnStringProperty(idContext.lastCaseStudyName)

  if (LName) LSetProperties.name = LName
  if (LPhone) LSetProperties.phone = LPhone
  if (LFormTitle) LSetProperties.last_form_title = LFormTitle
  if (LCaseStudyName) LSetProperties.last_case_study_name = LCaseStudyName
  if (idContext.newsletterOptIn) LSetProperties.newsletter_opt_in = true

  const LSetOnceProperties: Record<string, unknown> = {
    first_form_id: idContext.formId,
    first_form_source: idContext.formSource,
    first_submitted_at: LSubmittedAt,
  }

  if (LCaseStudyName) LSetOnceProperties.first_case_study_name = LCaseStudyName

  posthog.identify(
    LEmail,
    LSetProperties,
    LSetOnceProperties,
  )
}
