import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ArticleContent({ content }: { content: string | null }) {
  if (!content) return null;

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </Markdown>
    </article>
  );
}