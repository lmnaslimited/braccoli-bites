import { unstable_cache } from "next/cache"
import { ITransformer, Tcontext } from "@repo/middleware/types"

const LdCacheMap = new Map<string, ReturnType<typeof unstable_cache>>()

export async function fnGetCacheData<DynamicSourceType, DynamicTargetType>(
  iContext: Tcontext,
  transformer: ITransformer<DynamicSourceType, DynamicTargetType>,
) {
  const locale = iContext?.locale ?? "en"

  let slug
  if (iContext?.filters?.slug?.eq) {
    slug = iContext.filters.slug.eq
  }

  const LCacheKey = slug
    ? `${transformer.contentType}-${locale}-${slug}`
    : `${transformer.contentType}-${locale}`
  if (!LdCacheMap.has(LCacheKey)) {
    const fetcher = unstable_cache(
      async () => {
        const pageData: DynamicTargetType = await transformer.execute(iContext)
        return pageData
      },
      [LCacheKey],
      {
        revalidate: 3600,
        tags: slug ? [LCacheKey, locale, slug] : [LCacheKey, locale],
      },
    )
    LdCacheMap.set(LCacheKey, fetcher)
  }

  return await LdCacheMap.get(LCacheKey)!()
}
