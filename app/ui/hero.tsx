
import { cn } from "@/lib/utils";
import { TblogPageTarget } from "@repo/middleware/types";

export function Hero({ idProps }: { idProps: TblogPageTarget }) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Content */}
        <div className={cn("flex flex-col gap-6")}>
          {idProps.blogHome.blogHeader.badge && (
            <div className="inline-flex w-fit">
              <span className="inline-flex w-fit items-center rounded-full border bg-accent px-3 py-1 text-sm text-accent-foreground">
                {idProps.blogHome.blogHeader.badge}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-pretty">
            {idProps.blogHome.blogHeader.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            {idProps.blogHome.blogHeader.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
