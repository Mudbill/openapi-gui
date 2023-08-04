import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  children: string;
}

export default function Markdown(props: Props) {
  return (
    <article className="bg-slate-200 p-2 prose max-w-full">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <ReactSyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
                style={{
                  ...tomorrowNight,
                  hljs: { ...tomorrowNight.hljs, background: "none" },
                }}
              >
                {String(children).replace(/\n$/, "")}
              </ReactSyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {props.children}
      </ReactMarkdown>
    </article>
  );
}
