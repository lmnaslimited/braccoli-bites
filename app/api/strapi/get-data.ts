import { unstable_cache } from "next/cache"
import { ITransformer } from "@repo/middleware/types"
import { Tcontext } from "@repo/middleware/types"

const LdCacheMap = new Map<string, ReturnType<typeof unstable_cache>>()

export async function fnGetCacheData<DynamicSourceType, DynamicTargetType>(
  iContext: Tcontext,
  transformer: ITransformer<DynamicSourceType, DynamicTargetType>,
) {
  const LLocale = iContext?.locale ?? "en"

  let LSlug
  if (iContext?.filters?.slug?.eq) {
    LSlug = iContext.filters.slug.eq
  }

  const LCacheKey = LSlug
    ? `${transformer.contentType}-${LLocale}-${LSlug}`
    : `${transformer.contentType}-${LLocale}`
  if (!LdCacheMap.has(LCacheKey)) {
    const fetcher = unstable_cache(
      async () => {
        const pageData: DynamicTargetType = await transformer.execute(iContext)
        return pageData
      },
      [LCacheKey],
      {
        revalidate: 3600,
        tags: LSlug ? [LCacheKey, LLocale, LSlug] : [LCacheKey, LLocale],
      },
    )
    LdCacheMap.set(LCacheKey, fetcher)
  }

  return await LdCacheMap.get(LCacheKey)!()
}
