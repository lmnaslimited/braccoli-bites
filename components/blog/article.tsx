import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ArticleContent({
  content,
}: {
  content: string | null;
}) {
  if (!content) return null;

  const lCleanContent = content
    .replace(/color\s*:\s*black;?/gi, "")
    .replace(/color\s*:\s*#000000;?/gi, "")
    .replace(/color\s*:\s*rgb\(0,\s*0,\s*0\);?/gi, "");

  return (
      <div className="mx-auto max-w-4xl">
    
    <article
      className="
        prose
        max-w-none
        dark:prose-invert
        text-black
        dark:text-white
      "
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {lCleanContent}
      </Markdown>
    </article>
    </div>
  );
}