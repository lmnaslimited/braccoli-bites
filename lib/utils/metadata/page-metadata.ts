import type { Metadata } from "next"
import type { TpageMetadata } from "@repo/middleware/types"

export function getPageMetadata(data: TpageMetadata): Metadata {
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.map((k) => k.description),
    alternates: {
      canonical: data.canonical,
    },
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: data.ogUrl,
      type: data.ogType,
      siteName: data.ogSiteName,
      locale: data.ogLocale,
      images: data.ogImages?.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
    },
    twitter: {
      card: data.twitterCard,
      title: data.twitterTitle,
      description: data.twitterDescription,
      images: data.twitterImage,
      creator: data.twitterCreator,
    },
    category: data.category,
  }
}
